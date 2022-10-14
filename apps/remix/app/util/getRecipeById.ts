import type { Item } from "~/types/recipes";
import { API_URL } from "./constants.server";

export const getRecipeById = async (id: string | undefined) => {
  if (!id) {
    throw new Error("No id provided");
  }

  const response = await fetch(`${API_URL}/hellofresh/recipe/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  const data = (await response.json()) as Item;
  return data;
};
