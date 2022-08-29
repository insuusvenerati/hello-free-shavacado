export type RecipeHit = {
  name: string;
  description: string;
  id: string;
  ingredients: Ingredient[];
  tags: Tag[];
  slug: string;
  imagePath: string;
  rating: number;
};

type Ingredient = {
  name: string;
};

type Tag = {
  name: string;
  id: string;
};
