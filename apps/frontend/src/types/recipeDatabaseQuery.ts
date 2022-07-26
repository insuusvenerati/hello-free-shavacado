export interface RecipeQuery {
  recipe: Recipe;
}

export interface Recipe {
  id: string;
  link: string;
  name: string;
  slug: string;
  tags: Tag[];
  uuid: null;
  label: null;
  steps: Step[];
  wines: any[];
  active: boolean;
  author: null;
  yields: Yield[];
  comment: null;
  country: Country;
  isAddon: boolean;
  seoName: string;
  cardLink: string;
  category: Category;
  cuisines: Category[];
  headline: string;
  prepTime: string;
  utensils: Utensil[];
  allergens: Allergen[];
  canonical: null;
  createdAt: Date;
  imageLink: string;
  imagePath: string;
  isPremium: boolean;
  nutrition: Nutrition[];
  promotion: null;
  totalTime: string;
  updatedAt: Date;
  videoLink: null;
  yieldType: string;
  clonedFrom: string;
  difficulty: number;
  websiteUrl: string;
  description: string;
  highlighted: boolean;
  ingredients: RecipeIngredient[];
  servingSize: number;
  ratingsCount: number;
  averageRating: number;
  canonicalLink: null;
  favoritesCount: number;
  seoDescription: string;
  descriptionHTML: string;
  isDinnerToLunch: boolean;
  marketplaceItems: any[];
  uniqueRecipeCode: null;
  descriptionMarkdown: string;
  isExcludedFromIndex: boolean;
}

export interface Allergen {
  id: string;
  name: string;
  slug: string;
  type: string;
  usage: number;
  iconLink: string;
  iconPath: string;
  tracesOf: boolean;
  description: null;
  triggersTracesOf: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  type: string;
  usage: number;
  iconLink: null | string;
  iconPath: string;
}

export enum Country {
  Us = "US",
}

export interface RecipeIngredient {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  usage: number;
  family: Family;
  country: Country;
  shipped: boolean;
  allergens: string[];
  imageLink: string;
  imagePath: string;
  description: null;
  internalName: null | string;
  hasDuplicatedName: null;
}

export interface Family {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  iconLink: string;
  iconPath: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  description: null;
  usageByCountry: { [key: string]: number };
}

export interface Nutrition {
  name: string;
  type: string;
  unit: NutritionUnit;
  amount: number;
}

export enum NutritionUnit {
  G = "g",
  Kcal = "kcal",
  Mg = "mg",
}

export interface Step {
  index: number;
  images: Image[];
  timers: Timer[];
  videos: any[];
  utensils: string[];
  ingredients: string[];
  instructions: string;
  instructionsHTML: string;
  instructionsMarkdown: string;
}

export interface Image {
  link: string;
  path: string;
  caption: string;
}

export interface Timer {
  name: string;
  duration: string;
  ovenMode: null;
  temperature: null;
  temperatureUnit: null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  type: string;
  iconLink: null | string;
  iconPath: null | string;
  colorHandle: string;
  preferences: string[];
  displayLabel: boolean;
  numberOfRecipes: number;
  numberOfRecipesByCountry: { [key: string]: number };
}

export interface Utensil {
  id: string;
  name: string;
  type: string;
}

export interface Yield {
  yields: number;
  ingredients: YieldIngredient[];
}

export interface YieldIngredient {
  id: string;
  unit: IngredientUnit | null;
  amount: number | null;
}

export enum IngredientUnit {
  Clove = "clove",
  Cup = "cup",
  Milliliters = "milliliters",
  Ounce = "ounce",
  Tablespoon = "tablespoon",
  Teaspoon = "teaspoon",
  Thumb = "thumb",
  Unit = "unit",
}
