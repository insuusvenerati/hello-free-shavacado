import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "src/prisma.service";
import { RecipeQuery } from "src/recipes";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;

@Injectable()
export class HellofreshService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(HellofreshService.name);

  async findAll(query: string, page: number, token: string) {
    const skip = page !== 1 ? page * 20 : 0;
    const response = await axios.get(`${BASE_URL}take=20&q=${query}&skip=${skip}`, {
      headers: { authorization: token },
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
    const response = await axios.get<RecipeQuery>(
      `${BASE_URL}take=16&sort=-favorites&min-rating=3.3`,
      {
        headers: { authorization: token },
      },
    );

    return response.data;
  }
}
