import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { Response } from "@remix-run/node";
import recipeDataScraper from "recipe-data-scraper";
import { z } from "zod";
import { db } from "./db.server";

type CreateArgs = {
  url: string;
  userId: string;
};

export const createRecipeSchema = z.object({
  url: z.string().url(),
});

const create = async ({ url, userId }: CreateArgs) => {
  try {
    const recipe = await recipeDataScraper(url);
    if (!recipe) {
      throw new Response("Recipe not found", { status: 404 });
    }
    return await db.importedRecipe.create({
      data: {
        ...recipe,
        recipeYield: recipe.recipeYield.toString(),
        user: {
          connectOrCreate: {
            where: { id: userId },
            create: { id: userId, username: userId },
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      console.log(error.message);
      return new Response(error.message, { status: 400 });
    }
    return new Response(`An unknown error occured: ${error}`, { status: 500 });
  }
};

const findAll = async () => {
  try {
    return await db.importedRecipe.findMany();
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      throw new Response(error.message, { status: 400 });
    }
  }
};

const findAllByUser = async (userId: string) => {
  try {
    return await db.importedRecipe.findMany({
      where: { userId },
    });
  } catch (error) {
    if (error instanceof PrismaClientValidationError) {
      throw new Response(error.message, { status: 400 });
    }
  }
};

export default {
  create,
  findAll,
  findAllByUser,
};
