import { useAuth } from "@clerk/nextjs";
import { useQuery } from "react-query";
import { FavoritedRecipe } from "../types/favoriteRecipe";
import { getRecipes } from "../util/getRecipes";

export const useFavoriteRecipesQuery = () => {
  const { userId } = useAuth();
  return useQuery<FavoritedRecipe[], Error>(["favoriteRecipes", userId], () => getRecipes(userId), {
    enabled: !!userId,
    placeholderData: [],
  });
};
