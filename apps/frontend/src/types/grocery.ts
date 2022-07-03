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

export interface Groceries {
  groceries: Grocery[];
  ingredientsGroup: IngredientsGroup[];
}

export interface Grocery {
  ingredient: string;
  imagePath: null | string;
  id: string;
  slug: string;
  family: string;
  uuid: string;
}

export interface IngredientsGroup {
  _sum: Sum;
  ingredient: string;
  unit: Unit | null;
}

export interface Sum {
  amount: number | null;
}

export enum Unit {
  Cup = "cup",
  Jar = "jar",
  Ounce = "ounce",
  Tablespoon = "tablespoon",
  Teaspoon = "teaspoon",
  Thumb = "thumb",
  Unit = "unit",
}
