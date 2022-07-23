export interface ImportedRecipe {
  id: string;
  name: string;
  image: string;
  description: string;
  cookTime: string;
  prepTime: string;
  totalTime: string;
  recipeYield: string;
  recipeIngredients: string[];
  recipeInstructions: string[];
  recipeCategories: string[];
  recipeCuisines: string[];
  recipeTypes: string[];
  keywords: string[];
  cookTimeOriginalFormat: string;
  prepTimeOriginalFormat: string;
  totalTimeOriginalFormat: string;
  url: string;
  userId: string;
}
