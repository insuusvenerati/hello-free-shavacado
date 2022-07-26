import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { Ingredient, Prisma } from "@prisma/client";
import axios from "axios";
import { PrismaService } from "src/prisma.service";
import { RecipeQuery } from "src/types/recipes";
import { flattenObject } from "src/util/flattenObject";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;

type IngredientsResponse = {
  items: Ingredient[];
};

type RecipeQueryResponse = {
  items: Prisma.InputJsonValue;
};

@Injectable()
export class HellofreshService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(HellofreshService.name);

  async scrapeIngredients() {
    for (let skip = 0; skip < 1250; skip + 250) {
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
    const response = await axios.get<RecipeQuery>(
      `${BASE_URL}take=16&sort=-favorites&min-rating=3.3`,
      {
        headers: { authorization: token },
      },
    );

    return response.data;
  }
}
