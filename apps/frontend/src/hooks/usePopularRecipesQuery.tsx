import { useQuery } from "react-query";
import { RecipeQuery } from "types/recipes";
import { getPopularRecipes } from "../util/getPopularRecipes";

export const usePopularRecipesQuery = (staticRecipes: RecipeQuery) => {
  return useQuery(["popularRecipes"], getPopularRecipes, { initialData: staticRecipes });
};
