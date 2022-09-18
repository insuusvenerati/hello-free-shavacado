import { SignInProps } from "@clerk/types";
import { FavoritedRecipe } from "../types/favoriteRecipe";
import { API_URL } from "./constants";

type Args = {
  userId: string | null | undefined;
  recipeSlug: string;
  recipeName: string;
  openSignIn: (signInProps?: SignInProps) => void;
  imagePath: string;
  uuid: string;
};

export const addRecipe = async ({
  userId,
  recipeSlug,
  recipeName,
  openSignIn,
  imagePath,
  uuid,
}: Args) => {
  if (!userId) {
    openSignIn({});
    throw new Error("No user ID. Please sign in");
  }

  const response = await fetch(`${API_URL}/recipe`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      slug: recipeSlug,
      name: recipeName,
      userId: userId,
      imagePath,
      uuid,
    }),
  });

  const data = (await response.json()) as Promise<FavoritedRecipe>;

  return { data };
};
