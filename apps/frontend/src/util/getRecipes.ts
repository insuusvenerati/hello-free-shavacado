import { API_URL } from "./constants";
import { ActiveSessionResource } from "@clerk/types";
import { FavoritedRecipe } from "../types/favoriteRecipe";

export const getRecipes = async (session: ActiveSessionResource): Promise<FavoritedRecipe[]> => {
  const user = session.user.id;
  const response = await fetch(`${API_URL}/recipe?user=${user}`);
  return await response.json();
};
