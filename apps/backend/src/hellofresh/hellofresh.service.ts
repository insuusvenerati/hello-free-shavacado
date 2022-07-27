import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { Ingredient, PopularRecipe, Prisma } from "@prisma/client";
import axios from "axios";
import { Cache } from "cache-manager";
import { PrismaService } from "src/prisma.service";
import { Item, RecipeQuery } from "src/types/recipes";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;

type IngredientsResponse = {
  items: Ingredient[];
};

type RecipeQueryResponse =
  | ({
      items: Item[];
    } & Prisma.InputJsonValue)
  | Prisma.NullableJsonNullValueInput;

type Token = {
  access_token: string;
  expires_in: number;
  issued_at: number;
  token_type: string;
};

const TOKEN_URL =
  "https://stiforr-cors-anywhere.fly.dev/https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials";

@Injectable()
export class HellofreshService {
  constructor(private prisma: PrismaService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  private readonly logger = new Logger(HellofreshService.name);

  async scrapeRecipes() {
    for (let skip = 0; skip <= 3750; skip += 250) {
      console.log(skip);
      const token = await this.cacheManager.get<Token>("hf-token");
      const response = await axios.get(`${BASE_URL}take=250&skip=${skip}`, {
        headers: { authorization: `Bearer ${token.access_token}` },
      });

      response.data.items.map(async (item) => {
        await this.prisma.hellofresh.upsert({
          where: { id: item.id },
          create: {
            name: item.name,
            id: item.id,
            recipe: item,
          },
          update: {
            name: item.name,
            id: item.id,
            recipe: item,
          },
        });
      });
    }
    return { response: "Recipes scraped successfully" };
  }

  async scrapeIngredients() {
    for (let skip = 0; skip <= 1250; skip += 250) {
      console.log(skip);
      const URL = `https://gw.hellofresh.com/api/ingredients?country=us&locale=en-US&take=250&skip=${skip}`;
      const response = await axios.get<IngredientsResponse>(URL, {
        headers: {
          authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjEyNjQzNjksImlhdCI6MTY1ODYzNDYyNiwiaXNzIjoic2VuZiIsImp0aSI6IjhkN2FkMjIwLTdkOTctNDQ3ZS05YjcyLThmNDA0YWE2NDk3ZiJ9.2eNOXzBTEERKHKc5d-6e5_hNGd-GCi24OShZ3qEnauE`,
        },
      });
      response.data.items.map(async (item) => {
        if (item.family === null) {
          return;
          // const updatedItem = { ...item, family: undefined };
          // await this.prisma.ingredient.upsert({
          //   create: updatedItem,
          //   update: updatedItem,
          //   where: { id: item.id },
          // });
        }
        await this.prisma.ingredient.upsert({
          create: item,
          update: item,
          where: { id: item.id },
        });
      });
    }
  }

  async findAll(query: string, page: number, token: string) {
    const skip = page !== 1 ? page * 20 : 0;

    const count = await this.prisma.hellofresh.count({
      skip,
      take: 20,
    });

    const total = await this.prisma.hellofresh.count();

    const dbSearch = await this.prisma.hellofresh.findMany({
      where: {
        name: {
          search: query,
        },
      },
      skip: skip,
      take: 20,
      select: { recipe: true },
    });
    const formattedResults = dbSearch.map((value) => value.recipe);
    const results = { take: 20, skip, count, total, items: [...formattedResults] };
    if (dbSearch.length >= 20) return results;

    const response = await axios.get(`${BASE_URL}take=20&q=${query}&skip=${skip}`, {
      headers: { authorization: token },
    });

    response.data.items.map(async (item) => {
      await this.prisma.hellofresh.upsert({
        where: { id: item.id },
        create: {
          name: item.name,
          id: item.id,
          recipe: item,
        },
        update: {
          name: item.name,
          id: item.id,
          recipe: item,
        },
      });
    });

    return response.data;
  }

  async findOne(q: string, token: string) {
    const response = await axios.get(`${BASE_URL}take=1&q=${q}`, {
      headers: { authorization: token },
    });

    if (response.status !== 200) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    return response.data;
  }

  async getAllCuisines(token: string) {
    const response = await axios.get(CUISINE_URL, {
      headers: { authorization: token },
    });

    return response.data;
  }

  async getFavoriteRecipes(token: string) {
    const count = await this.prisma.popularRecipe.count({
      take: 16,
    });

    const total = await this.prisma.popularRecipe.count();

    const popularRecipes = await this.prisma.popularRecipe.findMany({
      take: 16,
    });

    const formattedResults = popularRecipes.map((value) => value.recipe);
    const results = { take: 16, count, total, items: [...formattedResults] };

    if (popularRecipes.length >= 16) return results;

    const response = await axios.get<RecipeQuery>(
      `${BASE_URL}take=16&sort=-favorites&min-rating=3.3`,
      {
        headers: { authorization: token },
      },
    );

    return response.data;
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async refreshFavoriteRecipes() {
    const tokenResponse = await axios.post<Token>(
      TOKEN_URL,
      {},
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "X-Requested-With": "Stiforr",
        },
      },
    );
    await this.cacheManager.set("hf-token", tokenResponse.data, { ttl: 60 * 60 * 24 });
    const token = await this.cacheManager.get<Token>("hf-token");
    const response = await axios.get(`${BASE_URL}take=250&sort=-favorites&min-rating=3.3`, {
      headers: { authorization: `Bearer ${token.access_token}` },
    });

    const popularRecipeScrapeResponse = response.data.items.map(async (item) => {
      await this.prisma.popularRecipe.upsert({
        create: { name: item.name, recipe: item, id: item.id },
        update: { name: item.name, recipe: item, id: item.id },
        where: { id: item.id },
      });
    }) as Prisma.Prisma__PopularRecipeClient<PopularRecipe>[];

    return { response: `${popularRecipeScrapeResponse.length} popular recipes added` };
  }
}
