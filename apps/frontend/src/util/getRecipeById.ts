import { Item } from "types/recipes";
import { API_URL } from "./constants";

type Args = {
  id: string;
};

export const getRecipeById = async ({ id }: Args) => {
  const response = await fetch(`${API_URL}/hellofresh/recipe/${id}`);
  const data = (await response.json()) as Item;
  return data;
};
