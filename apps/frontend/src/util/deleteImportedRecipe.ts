import { ImportedRecipe } from "../types/importedRecipe";
import { HF_IMPORTED_RECIPE_URL } from "./constants";

export const deleteImportedRecipe = async ({
  id,
  user,
}: {
  id: string;
  user: string | undefined | null;
}) => {
  if (!id) {
    await Promise.reject(new Error("Missing recipe id"));
  }

  if (!user) {
    await Promise.reject(new Error("Missing User ID"));
  }

  const response = await fetch(`${HF_IMPORTED_RECIPE_URL}/${id}?user=${user}`, {
    method: "DELETE",
  });
  const data = (await response.json()) as ImportedRecipe;

  return data;
};
