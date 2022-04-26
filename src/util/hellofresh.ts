import ky from "ky-universal";
import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "./constants";

type Token = {
  access_token: string;
};

type Search = {
  (
    searchText: string,
    token: string,
    ingredients?: string,
  ): Promise<RecipeQuery>;
};

export const hellofreshGetToken = async () => {
  const token = await ky
    .post(
      "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    )
    .json<Token>();

  return token;
};

export const hellofreshSearch = async (
  searchText: string,
  token: string,
  ingredients: string,
  options: {
    skip?;
    tag?;
    maxPrepTime?;
    difficulty?;
    take?;
  },
): Promise<RecipeQuery> => {
  if (!token) {
    throw new Error("Missing token");
  }

  // console.log(ingredients);

  const response = await ky.get(
    `${HELLOFRESH_SEARCH_URL}take=20&skip=${options?.skip}&ingredients=${
      ingredients ? ingredients : ""
    }&q=${searchText}`,
    { headers: { authorization: `Bearer ${token}` } },
  );

  return await response.json();
};
