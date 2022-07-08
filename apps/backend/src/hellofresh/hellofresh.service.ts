import { HttpService } from "@nestjs/axios";
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { Cache } from "cache-manager";
import { gotScraping } from "got-scraping";
import { PrismaService } from "src/prisma.service";
import { RecipeQuery } from "src/recipes";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;
const DELETE_ME_TOKEN = process.env.HF_TOKEN;

type Token = {
  access_token: string;
  expires_in: 2629743;
  issued_at: 1657148669;
  token_type: string;
};

const ONE_DAY = 86400;

@Injectable()
export class HellofreshService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cachemanager: Cache,
    private readonly httpService: HttpService,
  ) {}
  private readonly logger = new Logger(HellofreshService.name);

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: "Scrape Recipes Job",
  })
  async scrapeRecipesJob() {
    let skip = 0;
    const take = 10;
    const page = skip / take;
    await this.cachemanager.set("page", page, { ttl: 0 });

    const lastCreatedRecipe = await this.prisma.hellofresh.findFirst({
      select: { createdAt: true, id: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    const tokenFromCache = await this.cachemanager.get<Token>("hellofresh-token");

    const recipes = await gotScraping
      .get(`${BASE_URL}take=10&&skip=${skip}`, {
        headers: { authorization: `Bearer ${tokenFromCache.access_token}` },
      })
      .json<any>();

    recipes.items.map(async (item) => {
      await this.prisma.hellofresh.upsert({
        where: { id: item.id },
        create: {
          id: item.id,
          recipe: item,
        },
        update: {
          id: item.id,
          recipe: item,
        },
      });
    });
    skip = skip + 10;
    await this.cachemanager.set("skip", skip, { ttl: 0 });
    this.logger.debug({ message: "Scrape recipes job triggered", lastCreatedRecipe, page });
  }

  @Cron(CronExpression.EVERY_12_HOURS, {
    name: "Get hellofresh token",
  })
  async getToken() {
    const tokenResponse = await gotScraping
      .post("https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials")
      .json();

    const tokenFromCache = await this.cachemanager.get<Token>("hellofresh-token");

    if (!tokenFromCache) {
      await this.cachemanager.set("hellofresh-token", tokenResponse, { ttl: ONE_DAY * 30 });
      this.logger.log("Refreshed hellofresh-token");
    }
  }

  async findAll(query: string, page: number) {
    const skip = page !== 1 ? page * 20 : 0;
    const response = await axios.get(`${BASE_URL}take=20&q=${query}&skip=${skip}`, {
      headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
    });

    response.data.items.map(async (item) => {
      await this.prisma.hellofresh.upsert({
        where: { id: item.id },
        create: {
          id: item.id,
          recipe: item,
        },
        update: {
          id: item.id,
          recipe: item,
        },
      });
    });

    return response.data;
  }

  async findOne(q: string) {
    const response = await axios.get(`${BASE_URL}take=1&q=${q}`, {
      headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
    });

    if (response.status !== 200) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    return response.data;
  }

  async getAllCuisines() {
    const response = await axios.get(CUISINE_URL, {
      headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
    });

    return response.data;
  }

  async getFavoriteRecipes() {
    const response = await axios.get<RecipeQuery>(
      `${BASE_URL}take=16&sort=-favorites&min-rating=3.3`,
      {
        headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
      },
    );

    return response.data;
  }
}
