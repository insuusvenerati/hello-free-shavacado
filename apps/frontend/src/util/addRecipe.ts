import { FavoritedRecipe } from "../types/favoriteRecipe";
import type { UserResource } from "@clerk/types";
import { API_URL } from "./constants";

type Args = {
  user: UserResource | null | undefined;
  recipeSlug: string;
  recipeName: string;
  imagePath: string;
  uuid: string;
};

export const addRecipe = async ({ user, recipeSlug, recipeName, imagePath, uuid }: Args) => {
  if (!user) {
    throw new Error("No user ID. Please sign in");
  }

  const body = JSON.stringify({
    recipe: {
      name: recipeName,
      slug: recipeSlug,
      uuid,
      imagePath,
    },
    user: {
      id: user.id,
      name: user.fullName,
      username: user.username,
    },
  });

  const response = await fetch(`${API_URL}/recipe`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body,
  });

  if (!response.ok) {
    throw new Error("Error adding recipe");
  }

  const data = (await response.json()) as Promise<FavoritedRecipe>;

  return data;
};
