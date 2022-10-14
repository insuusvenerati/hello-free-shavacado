import { StarIcon } from "@heroicons/react/24/outline";
import type { ButtonProps } from "@mantine/core";
import { Button } from "@mantine/core";

import type { Item } from "~/types/recipes";
import type { RecipeHit } from "~/types/recipeSearchQuery";

type Props = { selectedRecipe: RecipeHit | Item } & ButtonProps;

export const AddToFavorites = ({ selectedRecipe, ...rest }: Props) => {
  // const { data: favoriteRecipes } = useFavoriteRecipesQuery();
  // const { mutate: addFavorite, isLoading } = useAddFavoriteRecipeMutation();

  // const isFavoriteRecipe = favoriteRecipes?.some((recipe) => recipe?.name === selectedRecipe?.name);

  return (
    <Button
      // onClick={() => addFavorite(selectedRecipe)}
      // disabled={isFavoriteRecipe}
      leftIcon={<StarIcon width={16} />}
      // loading={isLoading}
      type="submit"
      {...rest}
    >
      Add to favorites
      {/* {isFavoriteRecipe ? "Favorited" : "Add to favorites"} */}
    </Button>
  );
};
