import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";
import { hellofreshSearch } from "../util/hellofresh";

export const useRecipesQuery = ({ token, debouncedSearchText, page }) => {
  return useQuery<RecipeQuery, Error>(
    ["recipes", token, debouncedSearchText, page],
    async (): Promise<RecipeQuery> => {
      return await hellofreshSearch(debouncedSearchText, token, { page });
      // const response = await ky
      //   // .get(
      //   //   `/api/hellofresh?token=${token}&searchText=${debouncedSearchText}&page=${page}`,
      //   // )
      //   .get(`${HELLOFRESH_SEARCH_URL}/hellofresh?q=${debouncedSearchText}&page=${page}`)
      //   .json<RecipeQuery>();

      // return response;
    },
    {
      enabled: !!token && !!debouncedSearchText,
      staleTime: 1000 * 60 * 60,
      retry: false,
    },
  );
};
