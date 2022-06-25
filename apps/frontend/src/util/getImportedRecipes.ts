import { ImportedRecipe } from "../types/importedRecipe";
import { HF_IMPORTED_RECIPE_URL } from "./constants";

export const getImportedRecipes = async (userId: string) => {
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}?user=${userId}`);
  const data = (await response.json()) as ImportedRecipe[];

  return data;
};

export const getOneImportedRecipe = async ({ userId, id }: { userId: string; id: string }) => {
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}/${id}?user=${userId}`);
  if (!response.ok) throw new Error(`Error getting recipe: ${id}`);
  const data = (await response.json()) as ImportedRecipe;

  return data;
};
