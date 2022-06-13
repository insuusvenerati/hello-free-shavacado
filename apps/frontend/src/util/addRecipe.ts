import { API_URL } from "./constants";
import { ActiveSessionResource, SignInProps } from "@clerk/types";

export const addRecipe = async ({
  session,
  recipeSlug,
  recipeName,
  openSignIn,
  imagePath,
  uuid,
}: {
  session: ActiveSessionResource;
  recipeSlug: string;
  recipeName: string;
  openSignIn: (signInProps?: SignInProps) => void;
  imagePath: string;
  uuid: string;
}) => {
  if (!session) {
    openSignIn({});
  }

  const response = await fetch(`${API_URL}/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug: recipeSlug,
      name: recipeName,
      userId: session.user.id,
      imagePath,
      uuid,
    }),
  });

  const data = await response.json();

  return { data };
};
