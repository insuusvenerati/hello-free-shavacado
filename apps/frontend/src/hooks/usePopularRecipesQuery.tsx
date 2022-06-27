import { useQuery } from "react-query";
import { getPopularRecipes } from "../util/getPopularRecipes";

export const usePopularRecipesQuery = () => {
  return useQuery(["popularRecipes"], getPopularRecipes, {
    staleTime: 60 * 60,
  });
};
