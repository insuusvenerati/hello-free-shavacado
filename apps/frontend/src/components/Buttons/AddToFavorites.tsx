import { StarIcon } from "@heroicons/react/24/outline";
import { Button, ButtonProps } from "@mantine/core";
import { useAddFavoriteRecipeMutation } from "hooks/useAddFavoriteRecipeMutation";
import { useFavoriteRecipesQuery } from "hooks/useFavoriteRecipesQuery";
import { Item } from "types/recipes";
import { RecipeHit } from "types/recipeSearchQuery";

type Props = { selectedRecipe: RecipeHit | Item } & ButtonProps;

export const AddToFavorites = ({ selectedRecipe, ...rest }: Props) => {
  const { data: favoriteRecipes } = useFavoriteRecipesQuery();
  const { mutate: addFavorite, isLoading } = useAddFavoriteRecipeMutation();

  const isFavoriteRecipe = favoriteRecipes?.some((recipe) => recipe?.name === selectedRecipe?.name);

  return (
    <Button
      {...rest}
      onClick={() => addFavorite(selectedRecipe)}
      disabled={isFavoriteRecipe}
      leftIcon={<StarIcon width={16} />}
      loading={isLoading}
      type="submit"
    >
      {isFavoriteRecipe ? "Favorited" : "Add to favorites"}
    </Button>
  );
};
