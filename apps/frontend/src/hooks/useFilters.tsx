import { useCallback, useEffect, useState } from "react";
import { Item, RecipeQuery } from "../types/recipes";

export const useFilterRecipes = (recipes: RecipeQuery) => {
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Item[]>();
  const [recipesTotal, setRecipesTotal] = useState<number>();

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
    setRecipesTotal(Math.floor(recipes?.total / 20));
  }, [recipes?.total]);

  // const filteredRecipes = useMemo(() => {
  //   return recipes?.items?.filter((item) => allergenFilter(item) && ingredientFilter(item));
  // }, [ingredientFilter, allergenFilter, recipes?.items]);

  // const recipesTotal = Math.floor(recipes?.total / 20);

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
