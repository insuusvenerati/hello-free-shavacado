import type { Recipe, Tag } from "@prisma/client";

export type FavoritesWithRecipeAndId = {
  id: string;
  recipe: Recipe & {
    tags: Tag[];
  };
}[];
