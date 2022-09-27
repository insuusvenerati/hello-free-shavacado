import { Ingredient } from "types/ingredients";
import { API_URL } from "./constants";

export const getAllIngredients = async () => {
  const response = await fetch(`${API_URL}/hellofresh/ingredients`);
  return (await response.json()) as Ingredient[];
};
