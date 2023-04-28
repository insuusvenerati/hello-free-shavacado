import type { FavoritesWithRecipeAndId } from "~/types/favorites";
import { useMatchesData } from "~/utils";

export const useFavorites = () => {
  return useMatchesData<{ favoriteRecipes: FavoritesWithRecipeAndId }>("root")?.favoriteRecipes;
};
