import { SuggestedRecipes } from "../types/suggestedRecipes";
import { HF_SUGGESTED_RECIPE_URL } from "./constants";

export const getSuggestedRecipes = async (searchText: string, token: string) => {
  const response = await fetch(`${HF_SUGGESTED_RECIPE_URL}${searchText}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Error getting suggested recipes");
  }
  const data = (await response.json()) as SuggestedRecipes;
  return data;
};
