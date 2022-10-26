import { StarIcon } from "@heroicons/react/24/outline";
import type { ButtonProps } from "@mantine/core";
import { Button } from "@mantine/core";
import type { Prisma } from "@prisma/client";
import { useFetcher } from "@remix-run/react";
import type { Item } from "~/types/recipes";

import type { RecipeHit } from "~/types/recipeSearchQuery";

type Props = { selectedRecipe: RecipeHit | Item } & ButtonProps;

export const AddToFavorites = ({ selectedRecipe, ...rest }: Props) => {
  const fetcher = useFetcher<Prisma.RecipeCreateInput>();

  return (
    <Button
      onClick={() =>
        fetcher.submit(
          {
            slug: selectedRecipe.slug,
            name: selectedRecipe.name,
            imagePath: selectedRecipe.imagePath,
            uuid: selectedRecipe.id,
          },

          { method: "post", action: "/?index" },
        )
      }
      leftIcon={<StarIcon width={16} />}
      loading={fetcher.state === "loading"}
      {...rest}
    >
      Add to favorites
      {/* {isFavoriteRecipe ? "Favorited" : "Add to favorites"} */}
    </Button>
  );
};
