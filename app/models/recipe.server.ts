import type { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { Params } from "@remix-run/react";
import type { UploadHandler } from "@remix-run/server-runtime";
import {
  unstable_composeUploadHandlers,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/server-runtime";
import { HF_BASE_URL } from "~/constants";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import type { Recipes } from "~/types/recipe";
import { uploadImage } from "~/utils/cloudinary.server";

export const getAllRecipes = async ({
  skip,
  take,
  token,
  search,
  ingredients = "",
  quick = false,
}: {
  skip: number;
  take: number;
  token: string;
  search?: string | undefined;
  ingredients?: string | undefined;
  quick?: boolean | undefined;
}) => {
  const response = await fetch(
    `${HF_BASE_URL}skip=${skip}&take=${take}&q=${search}&ingredients=${ingredients}&min-rating=3.3&sort=-favorites&max-prep-time=${
      quick ? 30 : 9999
    }`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
  const recipes = await response.json();

  return recipes;
};

export const getRecipeByName = async ({ name, token }: { name: string; token: string }) => {
  const response = await fetch(`${HF_BASE_URL}q=${name}&take=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const recipe = (await response.json()) as Recipes;

  return recipe;
};

export const getRecipeCount = async (request: Request) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search).get("search");
  const tag = url.searchParams.get("tag");
  const ingredient = url.searchParams.get("ingredient");

  return await prisma.recipe.count({
    where: {
      name: {
        contains: search ?? undefined,
      },
      tags: {
        some: {
          name: tag ?? undefined,
        },
      },
      ingredients: {
        some: {
          name: ingredient ?? undefined,
        },
      },
    },
  });
};

type CreateRecipeInput = {
  name: string;
  description: string;
  difficulty: string;
  [key: string]: string;
};

export const createRecipe = async (request: Request) => {
  const user = await requireUser(request);
  // const body = await request.formData();
  const uploadHandler: UploadHandler = unstable_composeUploadHandlers(async ({ name, data }) => {
    if (name !== "imageUrl") {
      return undefined;
    }

    const uploadedImage = await uploadImage(data);
    return uploadedImage?.secure_url;
  }, unstable_createMemoryUploadHandler());

  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const fields = Object.fromEntries(formData.entries()) as CreateRecipeInput;
  const ingredients: string[] = [];
  const steps: string[] = [];

  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      const value = fields[key];
      if (key.startsWith("ingredients[")) {
        const index = key.match(/\d+/);
        if (index) ingredients[parseInt(index[0])] = value;
      } else if (key.startsWith("steps[")) {
        const index = key.match(/\d+/);
        if (index) steps[parseInt(index[0])] = value;
      }
    }
  }

  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      if (key.startsWith("ingredients[")) {
        delete fields[key];
      } else if (key.startsWith("steps[")) {
        delete fields[key];
      }
    }
  }

  try {
    const response = await prisma.createdRecipe.create({
      data: {
        ...fields,
        ingredients: JSON.stringify(ingredients),
        steps: JSON.stringify(steps),
        user: { connect: { id: user.id } },
      },
    });
    return { result: response, success: "true", error: false };
  } catch (error) {
    if (error instanceof Error) {
      return { success: "false", error: error.message };
    }
    console.log(error);
    return { success: "false", error: "Unknown error occured" };
  }
};

export const getCreatedRecipeById = async (request: Request, params: Params) => {
  const user = await requireUser(request);
  const { id } = params;
  try {
    const response = await prisma.createdRecipe.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return { success: "false", error: error.message };
    }
    return { success: "false", error: "Unknown error occured" };
  }
};

export const getCreatedRecipes = async (request: Request) => {
  const user = await requireUser(request);

  try {
    const response = await prisma.createdRecipe.findMany({
      where: {
        user: { id: user.id },
      },
    });
    return { result: response, success: "false", error: false };
  } catch (error) {
    if (error instanceof Error) {
      return { success: "false", error: error.message, result: [] };
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return { success: "false", error: error.message, result: [] };
    }
    return { success: "false", error: "Unknown error occured", result: [] };
  }
};

export const getAllDbRecipes = async (request: Request) => {
  const url = new URL(request.url);
  const search = new URLSearchParams(url.search).get("search");
  const page = url.searchParams.get("page") || 1;
  const take = Number(url.searchParams.get("take")) || 20;
  const sort = url.searchParams.get("orderBy") || "averageRating";
  const tag = url.searchParams.get("tag");
  const ingredient = url.searchParams.get("ingredient");
  const direction = url.searchParams.get("direction") || "desc";
  const skip = (Number(page) - 1) * take;

  const recipes = await prisma.recipe.findMany({
    where: {
      name: {
        contains: search ?? undefined,
      },
      tags: {
        some: {
          name: tag ?? undefined,
        },
      },
      ingredients: {
        some: {
          name: ingredient ?? undefined,
        },
      },
    },
    skip,
    take,
    orderBy: {
      [sort]: direction,
    },
    select: {
      id: true,
      name: true,
      tags: { select: { id: true, name: true } },
      imagePath: true,
      description: true,
    },
  });

  return recipes;
};

export const getDbRecipeById = async (id: string) => {
  return await prisma.recipe.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      tags: { select: { id: true, name: true } },
      imagePath: true,
      description: true,
      ingredients: true,
      steps: true,
      averageRating: true,
      cuisines: true,
      allergens: true,
      category: true,
      totalTime: true,
      nutrition: true,
      difficulty: true,
    },
  });
};

export const addFavorite = async (user: User, recipeId: string) => {
  return await prisma.favoriteRecipe.create({
    data: {
      user: { connect: { id: user.id } },
      recipe: { connect: { id: recipeId } },
    },
  });
};

export const getDbTags = async () => {
  return await prisma.tag.findMany({
    select: {
      name: true,
      id: true,
    },
  });
};

export const getDbIngredients = async () => {
  return await prisma.ingredient.findMany({
    select: {
      name: true,
      id: true,
      imagePath: true,
    },
  });
};

export const getUserFavorites = async (id: string | undefined) => {
  return await prisma.favoriteRecipe.findMany({
    where: {
      user: {
        every: {
          id,
        },
      },
    },
    select: {
      recipe: {
        select: {
          id: true,
        },
      },
    },
  });
};
