import { HF_BASE_URL } from "~/constants";
import type { Recipes } from "~/types/recipe";

export const getAllRecipes = async ({
  skip,
  take,
  token,
  search,
}: {
  skip: number;
  take: number;
  token: string;
  search?: string | undefined;
}) => {
  const response = await fetch(`${HF_BASE_URL}skip=${skip}&take=${take}&q=${search}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
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
