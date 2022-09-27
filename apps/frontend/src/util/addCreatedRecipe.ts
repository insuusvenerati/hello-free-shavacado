import type { CreatedRecipe } from "types/createdRecipe";
import { API_URL } from "./constants";
import type { UserResource } from "@clerk/types";

export const addCreatedRecipe = async (
  user: UserResource | null | undefined,
  recipe: Record<string, unknown>,
) => {
  if (!user) {
    throw new Error("No user id provided");
  }

  const body = JSON.stringify({
    recipe,
    user: {
      id: user.id,
      name: user.fullName,
      username: user.username,
    },
  });

  const response = await fetch(`${API_URL}/created-recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    throw new Error("Failed to add created recipe");
  }

  return (await response.json()) as CreatedRecipe;
};
