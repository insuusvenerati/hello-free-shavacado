import ky from "ky";
import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";
import { HELLOFRESH_SEARCH_URL } from "../util/constants";

export const usePopularRecipesQuery = () => {
  return useQuery(
    ["popularRecipes"],
    async (): Promise<RecipeQuery> => {
      return await ky.get(`${HELLOFRESH_SEARCH_URL}/favorites`).json();
    },
    { staleTime: 60 * 60 * 24, notifyOnChangeProps: ["data", "error"], retry: false },
  );
};
