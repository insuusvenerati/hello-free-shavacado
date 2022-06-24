export interface SuggestedRecipes {
  take: number;
  skip: number;
  count: number;
  total: null;
  items: SuggestedRecipesItem[];
}

export interface SuggestedRecipesItem {
  group: string;
  group_title: string;
  items: ItemItem[];
}

export interface ItemItem {
  title: string;
  recipeId: string;
  slug: string;
  headline: string;
  image: string;
}
