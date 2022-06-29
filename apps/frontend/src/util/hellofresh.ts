import ky from "ky";
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

export const hellofreshSearch = async (searchText: string, options?: HelloFreshSearchOptions) => {
  const { page = 1, tag, maxPrepTime, difficulty, take = 20 } = options || {};
  return await ky.get(`${HELLOFRESH_SEARCH_URL}?page=${page}&q=${searchText}`).json<RecipeQuery>();
};

export const hellofreshSearchBySlug = async ({ slug }: { slug: string | string[] | undefined }) => {
  if (!slug || typeof slug !== "string") {
    return await Promise.reject(new Error("Invalid recipe slug was provided"));
  }

  return await ky.get(`${HELLOFRESH_SEARCH_URL}/recipe?q=${slug}`).json<RecipeQuery>();
};
