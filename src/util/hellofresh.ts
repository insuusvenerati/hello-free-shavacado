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

  const response = await ky.get(`/hellofresh?page=${page}&q=${searchText}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return await response.json();
};

export const hellofreshSearchBySlug = async ({
  token,
  slug,
  take = 1,
}: {
  token: string;
  slug: string;
  take?: number;
}): Promise<RecipeQuery> => {
  if (!token) {
    throw new Error("Missing hellofresh token");
  }

  const response = await ky.get(`${HELLOFRESH_SEARCH_URL}?take=${take}&q=${slug}`, {
    headers: { authorization: `Bearer ${token}` },
  });

  return await response.json();
};
