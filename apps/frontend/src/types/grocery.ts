type User = {
  id: string | null | undefined;
  name: string | null | undefined;
  username: string | null | undefined;
};

export type AddGrocery = {
  grocery: Omit<Grocery, "recipeId" | "id">;
  recipe: {
    name: string;
    slug: string;
    uuid: string;
    imagePath: string;
  };
  user: User | null | undefined;
};

export interface Grocery {
  createdAt?: Date;
  ingredient: string;
  amount?: number | null;
  unit?: IngredientUnit;
  imagePath?: null | string;
  id: string;
  family: string;
  slug: string;
  uuid: string;
  recipeId: string;
}

export enum IngredientUnit {
  Clove = "clove",
  Cup = "cup",
  G = "g",
  Milliliters = "milliliters",
  Ounce = "ounce",
  Slice = "slice",
  Tablespoon = "tablespoon",
  Teaspoon = "teaspoon",
  Unit = "unit",
}
