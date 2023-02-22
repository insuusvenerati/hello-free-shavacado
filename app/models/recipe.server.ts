import { Recipe } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Params } from "@remix-run/react";
import { HF_BASE_URL } from "~/constants";
import { prisma } from "~/db.server";
import { requireUser } from "~/session.server";
import type { Recipes } from "~/types/recipe";

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
  const recipes = (await response.json()) as Recipes;

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

type CreateRecipeInput = {
  name: string;
  description: string;
  difficulty: string;
  [key: string]: string;
};

export const createRecipe = async (request: Request) => {
  const user = await requireUser(request);
  const body = await request.formData();
  const fields = Object.fromEntries(body.entries()) as CreateRecipeInput;
  const ingredients: string[] = [];
  const steps: string[] = [];

  for (const key in fields) {
    if (fields.hasOwnProperty(key)) {
      const value = fields[key];
      if (key.startsWith("ingredients[")) {
        const index = key.match(/\d+/);
        if (index) ingredients[index[0]] = value;
      } else if (key.startsWith("steps[")) {
        const index = key.match(/\d+/);
        if (index) steps[index[0]] = value;
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
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return { success: "false", error: error.message };
    }
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
