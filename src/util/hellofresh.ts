import { Recipes } from "../recipes";

export const hellofreshGetToken = async () => {
  const response = await fetch(
    "https://www.hellofresh.com/gw/auth/token?client_id=senf&grant_type=client_credentials",
    { method: "POST" }
  );
  return await response.json();
};

export const hellofreshSearch = async (
  searchText: string,
  token: string
): Promise<Recipes> => {
  if (!token) {
    throw new Error(`Missing token`);
  }
  const response = await fetch(
    `https://www.hellofresh.com/gw/recipes/recipes/search?limit=25&locale=en-US&country=US&q=${searchText}`,
    { headers: { authorization: `Bearer ${token}` } }
  );
  return await response.json();
};
