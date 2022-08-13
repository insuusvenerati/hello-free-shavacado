import { getCookie } from "cookies-next";
import ky from "ky";
import { RecipeQuery } from "../types/recipes";
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

const token = getCookie("hf-token") as string | undefined;

export const hellofreshGetToken = async () => {
  const response = await ky.post(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials&scope=public&locale=en-US&country=us",
  );

  const token = response.json<Token>();

  return token;
};

export const hellofreshSearch = async (searchText: string, options?: HelloFreshSearchOptions) => {
  const { page = 1, tag, maxPrepTime, difficulty, take = 20, token } = options || {};
  if (!token) return await Promise.reject("No token provided");

  const response = await ky.get(`${HELLOFRESH_SEARCH_URL}?page=${page}&q=${searchText}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json<RecipeQuery>();
  return data;
};

export const hellofreshSearchBySlug = async ({
  slug,
  token,
}: {
  slug: string | string[] | undefined;
  token?: string;
}) => {
  if (!slug || typeof slug !== "string") {
    return await Promise.reject("Invalid recipe slug was provided");
  }
  if (!token) return await Promise.reject("No token provided");

  const response = await ky.get(`${HELLOFRESH_SEARCH_URL}/recipe?q=${slug}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  const data = await response.json<RecipeQuery>();

  return data;
};
