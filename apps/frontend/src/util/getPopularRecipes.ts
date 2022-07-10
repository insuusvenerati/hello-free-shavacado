import kyUniversal from "ky-universal";
import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "./constants";

export const getPopularRecipes = async () => {
  const response = await kyUniversal.get(`${HELLOFRESH_SEARCH_URL}/favorites`);
  const data = await response.json<RecipeQuery>();

  // if (!response.ok) {
  //   throw new Error("Unable to fetch popular recipes");
  // }
  // const data = (await response.json()) as RecipeQuery;
  return data;
};
