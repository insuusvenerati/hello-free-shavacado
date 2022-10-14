import type { ImportedRecipe } from "~/types/importedRecipe";
import { HF_IMPORTED_RECIPE_URL } from "./constants.server";

export const getOneImportedRecipeAnon = async (id: string) => {
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}/one/${id}`);
  return (await response.json()) as ImportedRecipe;
};

export const getAllImportedRecipes = async () => {
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}/imported/all`);
  return (await response.json()) as ImportedRecipe[];
};

export const getImportedRecipes = async (userId: string | undefined | null) => {
  if (!userId) throw new Error("No user id");
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}?user=${userId}`);
  return (await response.json()) as ImportedRecipe[];
};

export const getOneImportedRecipe = async ({
  userId,
  id,
}: {
  userId: string | undefined | null;
  id: string;
}) => {
  if (!id || !userId) throw new Error("No id found");

  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}/${id}?user=${userId}`);
  if (!response.ok) throw new Error(`Error getting recipe: ${id}`);
  return (await response.json()) as ImportedRecipe;
};
