import { SuggestedRecipes } from "../types/suggestedRecipes";
import { HF_SUGGESTED_RECIPE_URL } from "./constants";

export const getSuggestedRecipes = async (searchText: string) => {
  const response = await fetch(`${HF_SUGGESTED_RECIPE_URL}${searchText}`);
  if (!response.ok) {
    throw new Error("Error getting suggested recipes");
  }
  return (await response.json()) as SuggestedRecipes;
};
