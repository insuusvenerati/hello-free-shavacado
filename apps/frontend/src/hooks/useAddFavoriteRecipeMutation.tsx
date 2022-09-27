import { useAuth, useClerk } from "@clerk/nextjs";
import { showNotification } from "@mantine/notifications";
import { useMutation, useQueryClient } from "react-query";
import { FavoritedRecipe } from "types/favoriteRecipe";
import { Item } from "types/recipes";
import { RecipeHit } from "types/recipeSearchQuery";
import { addRecipe } from "util/addRecipe";

export const useAddFavoriteRecipeMutation = () => {
  const { user } = useClerk();
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<FavoritedRecipe, Error, RecipeHit | Item, unknown>(
    (recipe) =>
      addRecipe({
        recipeSlug: recipe.slug,
        recipeName: recipe.name,
        imagePath: recipe.imagePath,
        uuid: recipe.id,
        user,
      }),
    {
      onError: (error) => {
        showNotification({
          title: "Error",
          message: error.message,
          color: "red",
        });
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(["favoriteRecipes", userId]);
        showNotification({
          title: "Success!",
          message: "Recipe added to favorites",
          color: "green",
        });
      },
    },
  );
};
