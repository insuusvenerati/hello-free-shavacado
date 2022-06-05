import ky from "ky-universal";
import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "./constants";

type Token = {
  access_token: string;
};

type HelloFreshSearchOptions = {
  page?: number;
  tag?: string;
  maxPrepTime?: number;
  difficulty?: number;
  take?: number;
  order?: string;
  cuisine?: string;
};

export const hellofreshGetToken = async () => {
  const token = await ky
    .post("https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials")
    .json<Token>();

  return token;
};

export const hellofreshSearch = async (
  searchText: string,
  token: string,
  options?: HelloFreshSearchOptions,
): Promise<RecipeQuery> => {
  const { page, tag, maxPrepTime, difficulty, take = 20 } = options;
  if (!token) {
    throw new Error("Missing token");
  }

  // console.log(ingredients);

  const response = await fetch(`${HELLOFRESH_SEARCH_URL}?page=${page}&q=${searchText}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return await response.json();
};

export const hellofreshSearchBySlug = async ({ slug }: { slug: string; take?: number }): Promise<RecipeQuery> => {
  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/recipe?q=${slug}`);

  return await response.json();
};
