// To parse this data:
//
//   import { Convert } from "./file";
//
//   const importedRecipe = Convert.toImportedRecipe(json);

import { RecipeHit } from "./recipeSearchQuery";
import { Hit } from "instantsearch.js";

export interface ImportedRecipe {
  id: string;
  name: string;
  image: string;
  description: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
  keywords: string[];
  recipeCategories: string[];
  recipeCuisines: string[];
  recipeIngredients: string[];
  recipeInstructions: string[];
  recipeTypes: string[];
  recipeYield: string;
  cookTimeOriginalFormat: string;
  prepTimeOriginalFormat: string;
  totalTimeOriginalFormat: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const isImportedRecipe = (
  recipe: ImportedRecipe | Hit<RecipeHit>,
): recipe is ImportedRecipe => {
  return (recipe as ImportedRecipe).cookTime !== undefined;
};

// Converts JSON strings to/from your types
export class Convert {
  public static toImportedRecipe(json: string): ImportedRecipe[] {
    return JSON.parse(json) as ImportedRecipe[];
  }

  public static importedRecipeToJson(value: ImportedRecipe[]): string {
    return JSON.stringify(value);
  }
}
