import { ImportedRecipe } from "../types/importedRecipe";
import { API_URL } from "./constants";

export const addImportedRecipe = async ({ url, user }: { url: string; user: string }) => {
  const response = await fetch(`${API_URL}/scrape?url=${url}&user=${user}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(`Unable to add recipe url: ${url}`);
  }
  const data = (await response.json()) as ImportedRecipe;
  return data;
};
