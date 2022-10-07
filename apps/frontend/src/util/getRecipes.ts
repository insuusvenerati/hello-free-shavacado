import { FavoritedRecipe } from "../types/favoriteRecipe";
import { API_URL } from "./constants";

export const getRecipes = async (userId: string | undefined | null) => {
  if (!userId) {
    throw new Error("Missing User ID");
  }
  const response = await fetch(`${API_URL}/recipe?user=${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return (await response.json()) as FavoritedRecipe[];
};
