import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";
import { hellofreshSearch } from "../util/hellofresh";

type RecipesQueryProps = {
  searchText: string;
  page: number;
};

export const useRecipesQuery = ({ searchText, page }: RecipesQueryProps) => {
  return useQuery<RecipeQuery, Error>(
    ["recipes", searchText, page],
    async (): Promise<RecipeQuery> => {
      return await hellofreshSearch(searchText, { page });
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      keepPreviousData: true,
    },
  );
};
