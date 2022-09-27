import { CreatedRecipe } from "types/createdRecipe";
import { API_URL } from "./constants";

export const getAllCreatedRecipes = async ({
  userId,
  token,
}: {
  userId: string | null | undefined;
  token: string | null;
}) => {
  if (!userId) {
    throw new Error("No user id provided");
  }

  if (!token) {
    throw new Error("No token provided");
  }

  const res = await fetch(`${API_URL}/created-recipe?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch created recipes");
  }

  const createdRecipes = (await res.json()) as CreatedRecipe[];
  return createdRecipes;
};
