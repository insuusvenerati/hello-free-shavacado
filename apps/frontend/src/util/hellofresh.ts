import { RecipeQuery } from "../types/recipes";
import type { Hellofresh } from "@stiforr/backend";
import { HELLOFRESH_SEARCH_URL } from "./constants";

export type Token = {
  access_token: string;
  expires_in: number;
  issued_at: number;
  token_type: string;
};

type HelloFreshSearchOptions = {
  page?: number;
  tag?: string;
  maxPrepTime?: number;
  difficulty?: number;
  take?: number;
  order?: string;
  cuisine?: string;
  token?: string;
};

export const hellofreshGetToken = async () => {
  const response = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials&scope=public&locale=en-US&country=us",
    { method: "POST" },
  );

  return (await response.json()) as Token;
};

export const hellofreshSearch = async (searchText: string, options?: HelloFreshSearchOptions) => {
  const { page = 1, tag, maxPrepTime, difficulty, take = 20 } = options || {};

  const response = await fetch(`${HELLOFRESH_SEARCH_URL}?page=${page}&q=${searchText}`);
  return (await response.json()) as RecipeQuery;
};

export const hellofreshSearchBySlug = async ({ slug }: { slug: string | string[] | undefined }) => {
  if (!slug || typeof slug !== "string") {
    throw "Invalid recipe slug was provided";
  }
  const response = await fetch(`${HELLOFRESH_SEARCH_URL}/recipe?q=${slug}`);
  return (await response.json()) as RecipeQuery;
};
