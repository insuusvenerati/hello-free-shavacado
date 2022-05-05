import ky from "ky";
import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";

export const useRecipesQuery = ({ token, debouncedSearchText, page }) => {
  return useQuery<RecipeQuery, Error>(
    ["recipes", token, debouncedSearchText, page],
    async (): Promise<RecipeQuery> => {
      const response = await ky
        .get(
          `/api/hellofresh?token=${token}&searchText=${debouncedSearchText}&page=${page}`,
        )
        .json<RecipeQuery>();

      return response;
    },
    {
      enabled: !!token && !!debouncedSearchText,
      staleTime: 1000 * 60 * 60,
      retry: false,
    },
  );
};
