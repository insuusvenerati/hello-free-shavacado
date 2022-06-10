import { API_URL } from "./constants";
import { ActiveSessionResource } from "@clerk/types";

export type FavoritedRecipe = {
  createdAt: string;
  recipe: string;
  id: string;
  userId: string;
  name: string;
  imagePath: string;
};

export const getRecipes = async (session: ActiveSessionResource): Promise<FavoritedRecipe[]> => {
  const user = session.user.id;
  const response = await fetch(`${API_URL}/recipe?user=${user}`);
  return await response.json();
};
