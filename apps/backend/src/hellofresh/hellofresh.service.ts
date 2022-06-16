import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import { PrismaService } from "src/prisma.service";
import { RecipeQuery } from "src/recipes";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;
const DELETE_ME_TOKEN = process.env.HF_TOKEN;

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
      .filter((item) => item.id !== "60eef023f0590e4f0a2baa83");
    // .slice(0, 16);

    return notAddonRecipe;
  }
}
