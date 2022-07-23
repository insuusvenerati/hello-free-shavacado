import { useCallback, useEffect, useState } from "react";
import { Item, RecipeQuery } from "../types/recipes";

export const useFilterRecipes = (recipes: RecipeQuery | undefined) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Item[]>();
  const [recipesTotal, setRecipesTotal] = useState<number | undefined>();

  const ingredientFilter = useCallback(
    (recipe: Item) => {
      if (recipe && selectedIngredients.length > 0) {
        return recipe.ingredients.some((ingredient) =>
          selectedIngredients.includes(ingredient.name),
        );
      }
      return true;
    },
    [selectedIngredients],
  );

  const allergenFilter = useCallback(
    (recipe: Item) => {
      if (recipe && selectedAllergens.length > 0) {
        return recipe.allergens.every((ingredient) => !selectedAllergens.includes(ingredient.name));
      }
      return true;
    },
    [selectedAllergens],
  );

  useEffect(() => {
    setFilteredRecipes(
      recipes?.items?.filter((item) => allergenFilter(item) && ingredientFilter(item)),
    );
  }, [allergenFilter, ingredientFilter, recipes]);

  useEffect(() => {
    if (recipes?.total) {
      setRecipesTotal(Math.floor(recipes?.total / 20));
    }
  }, [recipes?.total]);

  return {
    filteredRecipes,
    recipesTotal,
    selectedAllergens,
    selectedIngredients,
    setSelectedAllergens,
    setSelectedIngredients,
    setFilteredRecipes,
    setRecipesTotal,
  };
};
