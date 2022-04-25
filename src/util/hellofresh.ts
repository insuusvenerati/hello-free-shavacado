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
    options: {
      skip?: number;
      ingredients?: string;
      tag?: string;
      maxPrepTime?: string;
      difficulty?: number;
      take?: number;
    },
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

export const hellofreshSearch: Search = async (
  searchText,
  token,
  options: { skip?; ingredients?; tag?; maxPrepTime?; difficulty?; take? },
) => {
  if (!token) {
    throw new Error("Missing token");
  }

  const response = await ky.get(
    `${HELLOFRESH_SEARCH_URL}take=20&skip=${options.skip}&q=&ingredients=${searchText}`,
    { headers: { authorization: `Bearer ${token}` } },
  );

  return await response.json();
};
