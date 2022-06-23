import { ActiveSessionResource } from "@clerk/types";
import { ImportedRecipe } from "../types/importedRecipe";
import { HF_IMPORTED_RECIPE_URL } from "./constants";

export const getImportedRecipes = async (session: ActiveSessionResource) => {
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}?user=${session.user.id}`);
  const data = (await response.json()) as ImportedRecipe[];

  return data;
};
