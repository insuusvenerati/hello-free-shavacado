import { RecipeQuery } from "../types/recipes";

export const hellofreshGetToken = async () => {
  const response = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    { method: "POST" }
  );
  return await response.json();
};

export const hellofreshSearch = async (
  searchText: string,
  token: string,
  skip?: number
  // ingredients?: string | string[],
  // tag?: string,
  // maxPrepTime?: number,
  // difficulty?: number,
  // take?: number
): Promise<RecipeQuery> => {
  if (!token) {
    throw new Error(`Missing token`);
  }
  const response = await fetch(
    `https://www.hellofresh.com/gw/recipes/recipes/search?take=20&skip=${skip}&locale=en-US&country=US&q=${searchText}&ingredients=`,
    { headers: { authorization: `Bearer ${token}` } }
  );
  return await response.json();
};
