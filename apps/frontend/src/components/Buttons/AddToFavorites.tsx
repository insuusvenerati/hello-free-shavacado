import { useAuth, useClerk } from "@clerk/nextjs";
import { StarIcon } from "@heroicons/react/outline";
import { Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FormEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useFavoriteRecipesQuery } from "../../hooks/useFavoriteRecipesQuery";
import { Item } from "../../types/recipes";
import { addRecipe } from "../../util/addRecipe";

type Props = { selectedRecipe: Item };

type MutateError = {
  code: string;
};

export const AddToFavorites = ({ selectedRecipe, ...rest }: Props) => {
  const { openSignIn } = useClerk();
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  const { data: favoriteRecipes } = useFavoriteRecipesQuery();
  const { mutate: addFavorite, isLoading } = useMutation<
    unknown,
    MutateError,
    FormEvent<HTMLFormElement>
  >(
    async (event) => {
      event.preventDefault();
      return await addRecipe({
        userId,
        recipeSlug: selectedRecipe?.slug,
        openSignIn,
        recipeName: selectedRecipe.name,
        imagePath: selectedRecipe.imagePath,
        uuid: selectedRecipe.id,
      });
    },
    {
      onError: (error) => {
        if (error.code === "42501") {
          showNotification({
            color: "red",
            title: "Oh no",
            message: "Hey there, you already have this recipe favorited 🤥",
          });
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(["favoriteRecipes", userId]);
        showNotification({
          color: "green",
          title: "Success",
          message: "Successfully added recipe to favorites",
        });
      },
    },
  );

  const isFavoriteRecipe = favoriteRecipes?.some((recipe) => recipe?.name === selectedRecipe?.name);

  return (
    <form onSubmit={addFavorite}>
      <Button
        {...rest}
        disabled={isFavoriteRecipe}
        leftIcon={<StarIcon width={16} />}
        loading={isLoading}
        type="submit"
      >
        {isFavoriteRecipe ? "Favorited" : "Add to favorites"}
      </Button>
    </form>
  );
};
