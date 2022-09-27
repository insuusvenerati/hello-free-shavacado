import { ImportedRecipe } from "./importedRecipe";
import { Item } from "./recipes";
import { RecipeHit } from "./recipeSearchQuery";
import { Hit } from "instantsearch.js";

export interface CreatedRecipe {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  difficulty: string;
  tags: string[];
  image: string;
}

/**
 * Type narrows to CreatedRecipe
 */
export const isCreatedRecipe = (
  recipe: CreatedRecipe | ImportedRecipe | Hit<RecipeHit> | Item,
): recipe is CreatedRecipe => {
  return (recipe as CreatedRecipe).ingredients && (recipe as CreatedRecipe).createdAt !== undefined;
};
