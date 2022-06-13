import { FavoritedRecipe } from "./favoriteRecipe";

export type Grocery = {
  id?: number;
  createdAt?: Date;
  ingredient: string;
  amount: number;
  slug: string;
  imagePath: string;
  family: any;
  userId: string;
  unit: string;
  uuid: string;
  recipe: {
    connectOrCreate: { create: FavoritedRecipe; where: { uuid: string } };
  };
};
