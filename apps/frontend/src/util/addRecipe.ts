import { SignInProps } from "@clerk/types";
import ky from "ky";
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
    return await Promise.reject(new Error("No user ID. Please sign in"));
  }

  const data = await ky
    .post(`${API_URL}/recipe`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: recipeSlug,
        name: recipeName,
        userId: userId,
        imagePath,
        uuid,
      }),
    })
    .json<FavoritedRecipe>();

  return { data };
};
