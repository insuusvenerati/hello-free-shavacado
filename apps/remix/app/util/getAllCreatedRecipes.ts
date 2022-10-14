import type { CreatedRecipe } from "~/types/createdRecipe";
import { HF_CREATED_RECIPE_URL } from "./constants.server";

export const getAllCreatedRecipes = async (userId: string | null) => {
  if (!userId) {
    throw new Error("No user id provided");
  }

  const res = await fetch(`${HF_CREATED_RECIPE_URL}?userId=${userId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch created recipes");
  }

  const createdRecipes = (await res.json()) as CreatedRecipe[];
  return createdRecipes;
};
