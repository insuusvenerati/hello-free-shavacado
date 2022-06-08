import { useClerk, useSession } from "@clerk/nextjs";
import { StarIcon } from "@heroicons/react/outline";
import { Button, SharedButtonProps } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { PostgrestError } from "@supabase/supabase-js";
import { FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Item } from "../../types/recipes";
import { addRecipe } from "../../util/addRecipe";
import { getRecipes } from "../../util/getRecipes";

type Props = { selectedRecipe: Item } & SharedButtonProps;

export const AddToFavorites = ({ selectedRecipe, ...rest }: Props) => {
  const { openSignIn } = useClerk();
  const queryClient = useQueryClient();
  const { session } = useSession();
  const { data: favoriteRecipes } = useQuery(["recipes"], () => getRecipes(), {
    staleTime: 60 * 60 * 24,
    refetchOnWindowFocus: false,
    notifyOnChangeProps: ["data", "error"],
  });
  const { mutate: addFavorite, isLoading } = useMutation<
    unknown,
    PostgrestError,
    FormEvent<HTMLFormElement>
  >(
    async (event) => {
      event.preventDefault();
      return await addRecipe({
        session,
        recipeSlug: selectedRecipe?.slug,
        openSignIn,
        recipeName: selectedRecipe.name,
        imagePath: selectedRecipe.imagePath,
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
      onSuccess: () => {
        queryClient.invalidateQueries(["recipes"]);
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
