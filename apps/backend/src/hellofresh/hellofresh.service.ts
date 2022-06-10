import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "src/prisma.service";
import { RecipeQuery } from "src/recipes";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;
const DELETE_ME_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTUxOTE5MjgsImlhdCI6MTY1MjU2MjE4NSwiaXNzIjoic2VuZiIsImp0aSI6IjRkZWY5YTBlLTk3ODctNDBkYi05NzZhLWMxZDQ2OWU3ZjMzOCJ9.4j_4vQ0qmx0wOM_sRaZIEUrC0PzAufRoTtNdzxvQsVg`;

@Injectable()
export class HellofreshService {
  constructor(private prisma: PrismaService) {}
  private readonly logger = new Logger(HellofreshService.name);

  async findAll(query: string, page: number) {
    if (!query) return "No query was supplied";

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

  async findOne(query: string) {
    if (!query) return "No query was supplied";

    const response = await axios.get(`${BASE_URL}take=1&q=${query}`, {
      headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
    });

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
      `${BASE_URL}take=250&order=favorites&min-rating=3`,
      {
        headers: { authorization: `Bearer ${DELETE_ME_TOKEN}` },
      },
    );

    const notAddonRecipe = response.data.items
      .filter((item) => item.ratingsCount > 100)
      .filter((item) => item.isAddon === false)
      .slice(0, 16);

    return notAddonRecipe;
  }
}
