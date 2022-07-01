import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Item } from "../types/recipes";
import { HF_AVATAR_IMAGE_URL } from "../util/constants";
import { useFilterRecipes } from "./useFilters";
import { useRecipesQuery } from "./useRecipesQuery";

export const useRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Item>();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState<number>(1);
  // const {
  //   data: recipes,
  //   isLoading,
  //   error,
  //   isError,
  //   refetch,
  //   remove,
  //   isFetching,
  // } = trpc.useQuery(["hellofresh.search", { query: searchText, page }], {
  //   enabled: !!searchText && page > 1,
  //   keepPreviousData: true,
  // });

  const {
    data: recipes,
    isLoading,
    error,
    isError,
    refetch,
    remove,
    isFetching,
    isSuccess,
  } = useRecipesQuery({ searchText, page });

  const {
    filteredRecipes,
    recipesTotal,
    selectedAllergens,
    selectedIngredients,
    setSelectedAllergens,
    setSelectedIngredients,
    setFilteredRecipes,
    setRecipesTotal,
  } = useFilterRecipes(recipes);

  const onSubmitHandler = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    refetch().catch((error) => console.log(error));
  };

  const allergens = [
    ...new Set(
      recipes?.items
        ?.map((item) =>
          item.allergens.map((allergen) => {
            return {
              value: allergen.name,
              label: allergen.name,
              image: `${HF_AVATAR_IMAGE_URL}${allergen.iconPath}`,
            };
          }),
        )
        .flat(),
    ),
  ];

  const uniqueAllergens = allergens?.filter(
    (val, i, self) => i === self.findIndex((a) => a.label === val.label),
  );

  const ingredients = [
    ...new Set(
      recipes?.items
        ?.map((recipe) => recipe.ingredients.map((ingredient) => ingredient.name))
        .flat(),
    ),
  ];

  const clearSearchHandler = () => {
    setSearchText("");
    setPage(1);
    setFilteredRecipes(undefined);
    setRecipesTotal(undefined);
    remove();
  };
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const pageChangeHandler = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const handleSetSelectedIngredients = (value: string[]) => {
    setSelectedIngredients(value);
  };

  const handleSetSelectedAllergens = (value: string[]) => {
    setSelectedAllergens(value);
  };

  return {
    isLoading,
    isError,
    error,
    filteredRecipes,
    selectedRecipe,
    recipesTotal,
    page,
    setSelectedRecipe,
    clearSearchHandler,
    onChangeHandler,
    pageChangeHandler,
    handleSetSelectedIngredients,
    handleSetSelectedAllergens,
    uniqueAllergens,
    ingredients,
    selectedAllergens,
    selectedIngredients,
    searchText,
    onSubmitHandler,
    isFetching,
    setSearchText,
    isSuccess,
  };
};
