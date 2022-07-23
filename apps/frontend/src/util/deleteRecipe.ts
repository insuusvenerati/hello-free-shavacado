import { FavoritedRecipe } from "../types/favoriteRecipe";
import { API_URL } from "./constants";

type Args = {
  userId: string | undefined | null;
  id: string | undefined | null;
};

export const deleteRecipe = async ({ userId, id }: Args) => {
  if (typeof userId === "undefined" || null) {
    return Promise.reject(new Error("Missing User ID"));
  }

  if (!id) {
    return Promise.reject(new Error("No recipe was given O.o"));
  }

  const response = await fetch(`${API_URL}/recipe/${id}`, {
    method: "DELETE",
  });
  const data = (await response.json()) as FavoritedRecipe;

  return { data };
};
