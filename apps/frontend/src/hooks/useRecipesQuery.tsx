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
    async () => {
      return await hellofreshSearch(searchText, { page });
    },
    {
      enabled: !!searchText && page > 1,
      keepPreviousData: true,
    },
  );
};
