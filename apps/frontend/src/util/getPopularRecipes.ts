import { getCookie } from "cookies-next";
import kyUniversal from "ky-universal";
import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "./constants";

const token = getCookie("hf-token") as string;

export const getPopularRecipes = async () => {
  const response = await kyUniversal.get(`${HELLOFRESH_SEARCH_URL}/favorites`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const data = await response.json<RecipeQuery>();

  // if (!response.ok) {
  //   throw new Error("Unable to fetch popular recipes");
  // }
  // const data = (await response.json()) as RecipeQuery;
  return data;
};
