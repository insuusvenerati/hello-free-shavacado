import { getCookie } from "cookies-next";
import { useCallback, useState } from "react";
import { Item } from "../types/recipes";
import { useDebounce } from "./useDebounce";
import { useFilterRecipes } from "./useFilters";
import { useRecipesQuery } from "./useRecipesQuery";

export const useRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce<string>(searchText, 1000);
  const token = getCookie("token");
  const [page, setPage] = useState(1);

  const { data: recipes, isLoading, error, isError } = useRecipesQuery({ debouncedSearchText, page, token });

  const {
    filteredRecipes,
    recipesTotal,
    selectedAllergens,
    selectedIngredients,
    setSelectedAllergens,
    setSelectedIngredients,
  } = useFilterRecipes(recipes);

  const allergens = [...new Set(recipes?.items?.map((item) => item.allergens.map((allergen) => allergen.name)).flat())];

  const ingredients = [
    ...new Set(recipes?.items?.map((recipe) => recipe.ingredients.map((ingredient) => ingredient.name)).flat()),
  ];

  const onChangeHandler = useCallback(
    (event) => {
      setSearchText(event.target.value);
    },
    [setSearchText],
  );

  const pageChangeHandler = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const handleSetSelectedIngredients = useCallback(
    (value: string[]) => {
      setSelectedIngredients(value);
    },
    [setSelectedIngredients],
  );

  const handleSetSelectedAllergens = useCallback(
    (value: string[]) => {
      setSelectedAllergens(value);
    },
    [setSelectedAllergens],
  );

  return {
    isLoading,
    isError,
    error,
    filteredRecipes,
    selectedRecipe,
    recipesTotal,
    page,
    setSelectedRecipe,
    onChangeHandler,
    pageChangeHandler,
    handleSetSelectedIngredients,
    handleSetSelectedAllergens,
    allergens,
    ingredients,
    selectedAllergens,
    selectedIngredients,
  };
};
