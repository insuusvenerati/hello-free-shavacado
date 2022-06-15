import { API_URL } from "./constants";
import { ActiveSessionResource, SignInProps } from "@clerk/types";
import { FavoritedRecipe } from "../types/favoriteRecipe";
import ky from "ky";

export const addRecipe = async ({
  session,
  recipeSlug,
  recipeName,
  openSignIn,
  imagePath,
  uuid,
}: {
  session: ActiveSessionResource | null | undefined;
  recipeSlug: string;
  recipeName: string;
  openSignIn: (signInProps?: SignInProps) => void;
  imagePath: string;
  uuid: string;
}): Promise<{ data: FavoritedRecipe }> => {
  if (!session) {
    openSignIn({});
  }

  const data = await ky
    .post(`${API_URL}/recipe`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: recipeSlug,
        name: recipeName,
        userId: session?.user?.id,
        imagePath,
        uuid,
      }),
    })
    .json<FavoritedRecipe>();

  return { data };
};
