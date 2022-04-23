import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "./constants";

export const hellofreshGetToken = async () => {
  const response = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    { method: "POST" },
  );

  if (!response.ok) {
    throw new Error("There was an issue getting a token from Hellofresh");
  }
  return await response.json();
};

export const hellofreshSearch = async (
  searchText,
  token,
  options: { skip?; ingredients?; tag?; maxPrepTime?; difficulty?; take? },
): Promise<RecipeQuery> => {
  if (!token) {
    throw new Error("Missing token");
  }

  const response = await fetch(
    `${HELLOFRESH_SEARCH_URL}take=20&skip=${options.skip}&q=&ingredients=${searchText}`,
    { headers: { authorization: `Bearer ${token}` } },
  );

  if (!response.ok) {
    throw new Error("There was an issue contacting the hello fresh API");
  }

  return await response.json();
};
