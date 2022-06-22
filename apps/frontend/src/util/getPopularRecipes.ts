import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "./constants";

export const getPopularRecipes = async () => {
  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/favorites`);

  if (!response.ok) {
    throw new Error("Unable to fetch popular recipes");
  }
  const data = (await response.json()) as RecipeQuery;
  return data;
};
