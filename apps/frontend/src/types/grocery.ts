import { FavoritedRecipe } from "./favoriteRecipe";

export type AddGrocery = {
  id?: number;
  createdAt?: Date;
  ingredient: string;
  amount: number;
  slug: string;
  imagePath: string;
  family: string;
  userId: string;
  unit: string;
  uuid: string;
  recipe: {
    connectOrCreate: { create: FavoritedRecipe; where: { uuid: string } };
  };
};

export interface Grocery {
  createdAt: Date;
  ingredient: string;
  amount: number | null;
  unit: Unit | null;
  imagePath: null | string;
  id: string;
  userId: string;
  family: string;
  slug: string;
  uuid: string;
  recipeId: string;
}

export enum Unit {
  Clove = "clove",
  Cup = "cup",
  Jar = "jar",
  Ounce = "ounce",
  Tablespoon = "tablespoon",
  Teaspoon = "teaspoon",
  Thumb = "thumb",
  Unit = "unit",
}
