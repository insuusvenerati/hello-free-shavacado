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
import { RecipeQuery } from "src/types/recipes";

const BASE_URL = `https://www.hellofresh.com/gw/recipes/recipes/search?country=us&locale=en-US&`;
const CUISINE_URL = `https://gw.hellofresh.com/api/cuisines?country=us&locale=en-US&take=250`;

type IngredientsResponse = {
  items: Ingredient[];
};

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
    for (let skip = 0; skip <= 3750; skip += 250) {
      this.logger.log(`Skip: ${skip}`);
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
            description: item.description,
          },
          update: {
            name: item.name,
            id: item.id,
            recipe: item,
            description: item.description,
          },
        });
      });
    }

    const allRecipesQuery = await this.prisma.hellofresh.findMany();

    const hellofreshDocuments = allRecipesQuery.map((recipe: any) => {
      const ingredients = recipe.recipe.ingredients.map((ing) => ({ name: ing.name }));
      const tags = recipe.recipe.tags.map((tag) => ({ name: tag.name, id: tag.id }));
      return {
        name: recipe.name,
        description: recipe.description,
        id: recipe.id,
        ingredients: ingredients,
        tags: tags,
        slug: recipe.recipe.slug,
        imagePath: recipe.recipe.imagePath,
        rating: recipe.recipe.averageRating,
      };
    });
    // const algoliaIndexResponse = await hellofreshIndex
    //   .saveObjects(hellofreshDocuments, { autoGenerateObjectIDIfNotExist: true })
    //   .wait();

    return {
      message: "Recipes scraped successfully",
      // algoliaIndexResponse,
    };
  }

  async scrapeIngredients() {
    const token = await this.cacheManager.get<Token>("hf-token");

    for (let skip = 0; skip <= 1250; skip += 250) {
      console.log(skip);
      const URL = `https://gw.hellofresh.com/api/ingredients?country=us&locale=en-US&take=250&skip=${skip}`;
      const response = await axios.get<IngredientsResponse>(URL, {
        headers: {
          authorization: `Bearer ${token.access_token}`,
        },
      });

      const prismaUpsert = response.data.items.map((item) => {
        if (item.family === null) {
          return this.prisma.ingredient.create({
            data: {
              ...item,
              family: undefined,
            },
          });
        }
        return this.prisma.ingredient.create({
          data: item,
        });
      });

      await this.prisma.$transaction(prismaUpsert);
    }

    // await this.prisma.$transaction()

    return await this.prisma.ingredient.findMany();
  }

  async findAll(query: string, page: number) {
    const token = await this.cacheManager.get<Token>("hf-token");
    const tsquerySpecialChars = /[()|&:*!]/g;
    const getQueryFromSearchPhrase = (searchPhrase: string) =>
      searchPhrase.replace(tsquerySpecialChars, " ").trim().split(/\s+/).join(" | ");
    const tsquery = getQueryFromSearchPhrase(query);

    const skip = page !== 1 ? page * 20 : 0;

    const count = await this.prisma.hellofresh.count({
      skip,
      take: 20,
    });

    const total = await this.prisma.hellofresh.count();
    const dbSearch: any = await this.prisma.$queryRaw`
      SELECT recipe FROM "hellofresh"
      WHERE "textSearch" @@ to_tsquery('english', ${tsquery})
      ORDER BY ts_rank("textSearch", to_tsquery('english', ${tsquery})) DESC
      LIMIT 20 OFFSET ${skip};
    `;

    const formattedResults = dbSearch.map((value) => value.recipe);
    const results = { take: 20, skip, count, total, items: [...formattedResults] };
    if (dbSearch.length >= 20) return results;

    const response = await axios.get(`${BASE_URL}take=20&q=${query}&skip=${skip}`, {
      headers: { authorization: token.access_token },
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

  async findOne(q: string, tokenFromReq: string) {
    const token = await this.cacheManager.get<Token>("hf-token");

    const dbSearch = await this.prisma.hellofresh.findFirst({
      where: {
        name: {
          search: q,
        },
      },
    });

    if (dbSearch) return dbSearch;
    const response = await axios.get(`${BASE_URL}take=1&q=${q}`, {
      headers: {
        authorization: `Bearer ${token.access_token ? token.access_token : tokenFromReq}`,
      },
    });

    if (response.status !== 200) {
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }

    return response.data;
  }

  async findOneById(id: string) {
    const data = await this.prisma.hellofresh.findFirst({
      where: {
        id,
      },
    });

    return data.recipe;
  }

  async getAllCuisines(token: string) {
    const response = await axios.get(CUISINE_URL, {
      headers: { authorization: token },
    });

    return response.data;
  }

  async getFavoriteRecipes() {
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
    const count = await this.prisma.popularRecipe.count({
      take: 250,
    });

    const total = await this.prisma.popularRecipe.count();

    const popularRecipes = await this.prisma.popularRecipe.findMany({
      take: 250,
    });

    const formattedResults = popularRecipes.map((value) => value.recipe);
    const results = { take: 250, count, total, items: [...formattedResults] };

    if (popularRecipes.length >= 249) return results;

    const response = await axios.get<RecipeQuery>(
      `${BASE_URL}take=16&sort=-favorites&min-rating=3.3`,
      {
        headers: { authorization: `Bearer ${token.access_token}` },
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

  async getAllIngredients(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.IngredientWhereUniqueInput;
    where?: Prisma.IngredientWhereInput;
    orderBy?: Prisma.IngredientOrderByWithRelationAndSearchRelevanceInput;
  }): Promise<Ingredient[]> {
    const { skip, take = 10, cursor, where, orderBy } = params;
    return await this.prisma.ingredient.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }
}
