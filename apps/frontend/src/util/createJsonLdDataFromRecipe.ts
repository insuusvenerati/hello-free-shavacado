import { Item } from "../types/recipes";
import { getOgImageUrl } from "./constants";
import { RecipeJsonLdProps } from "next-seo";

export const createJsonLdDataFromRecipe = (recipe: Item): RecipeJsonLdProps => {
  return {
    name: recipe.name,
    description: recipe.description,
    authorName: recipe.author ?? "Hello Fresh",
    ingredients: { ...recipe.ingredients.map((i) => i.name) },
    instructions: recipe.steps.map((step) => ({ name: step.index, text: step.instructions })),
    prepTime: recipe.prepTime,
    cookTime: recipe.totalTime ?? "PT30M",
    category: recipe.category?.name ?? null,
    cuisine: recipe.cuisines[0].name,
    images: [getOgImageUrl(recipe.imagePath)],
    aggregateRating: { ratingValue: recipe.averageRating, ratingCount: recipe.ratingsCount },
    keywords: recipe.tags.map((t) => t.name)[0],
    calories: recipe.nutrition.filter((n) => n.name === "Calories").map((n) => n.amount)[0],
  };
};
