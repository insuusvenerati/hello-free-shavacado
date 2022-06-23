import { ImportedRecipe } from "../types/importedRecipe";
import { HF_IMPORTED_RECIPE_URL } from "./constants";

export const deleteImportedRecipe = async ({ id, user }: { id: string; user: string }) => {
  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}/${id}?user=${user}`, {
    method: "DELETE",
  });
  const data = (await response.json()) as ImportedRecipe;

  return data;
};
