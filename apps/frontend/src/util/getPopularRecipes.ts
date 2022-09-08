import { getCookie } from "cookies-next";
import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "./constants";

const token = getCookie("hf-token") as string;

export const getPopularRecipes = async () => {
  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/favorites`, {
    headers: { authorization: `Bearer ${token}` },
  });
  // if (!response.ok) {
  //   throw new Error("Unable to fetch popular recipes");
  // }
  // const data = (await response.json()) as RecipeQuery;
  return (await response.json()) as RecipeQuery;
};
