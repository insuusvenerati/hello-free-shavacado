import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";
import { hellofreshSearch } from "../util/hellofresh";

export const useRecipesQuery = ({ token, debouncedSearchText, page }) => {
  return useQuery<RecipeQuery, Error>(
    ["recipes", token, debouncedSearchText, page],
    async (): Promise<RecipeQuery> => {
      return await hellofreshSearch(debouncedSearchText, token, { page });
    },
    {
      enabled: !!token && !!debouncedSearchText,
      staleTime: 60,
      retry: false,
    },
  );
};
