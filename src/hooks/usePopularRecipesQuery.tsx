import ky from "ky";
import { useQuery } from "react-query";
import { RecipeQuery } from "../types/recipes";

export const usePopularRecipesQuery = ({ token }: { token: string }) => {
  return useQuery(
    ["popularRecipes", token],
    async (): Promise<RecipeQuery> => {
      return await ky.get("/hellofresh/favorites").json();
    },
    { staleTime: 60 * 60, notifyOnChangeProps: ["data", "error"], retry: false },
  );
};
