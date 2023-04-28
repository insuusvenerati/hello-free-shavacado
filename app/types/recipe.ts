export interface Recipes {
  take: number;
  skip: number;
  count: number;
  total: number;
  items: Item[];
}

export interface Item {
  id: string;
  link: string;
  name: string;
  slug: string;
  tags: Tag[];
  uuid: null;
  label: Label | null;
  steps: Step[];
  wines: any[];
  active: boolean;
  author: null | string;
  yields: Yield[];
  comment: null;
  country: string;
  isAddon: boolean;
  seoName: null | string;
  cardLink: null | string;
  category: Category | null;
  cuisines: Category[];
  headline: string;
  prepTime: string;
  utensils: Utensil[];
  allergens: Allergen[];
  canonical: null;
  createdAt: string;
  imageLink: string;
  imagePath: string;
  isPremium: boolean;
  nutrition: Nutrition[];
  promotion: null;
  totalTime: TotalTime | null;
  updatedAt: string;
  videoLink: null;
  yieldType: string;
  clonedFrom: null | string;
  difficulty: number;
  websiteUrl: string;
  description: string;
  highlighted: boolean;
  ingredients: ItemIngredient[];
  servingSize: number;
  ratingsCount: number;
  averageRating: number | null;
  canonicalLink: null;
  favoritesCount: number;
  seoDescription: null | string;
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

export interface ItemIngredient {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  usage: number;
  family: Family;
  country: string;
  shipped: boolean;
  allergens: string[];
  imageLink: null | string;
  imagePath: null | string;
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
  iconLink: null | string;
  iconPath: null | string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  description: null;
  usageByCountry: { [key: string]: number };
}

export interface Label {
  text: string;
  handle: string;
  displayLabel: boolean;
  backgroundColor: string;
  foregroundColor: ForegroundColor;
}

export type ForegroundColor = string;

export interface Nutrition {
  name: NutritionName;
  type: NutritionType;
  unit: NutritionUnit;
  amount: number;
}

export enum NutritionName {
  Calories = "Calories",
  Carbohydrate = "Carbohydrate",
  Cholesterol = "Cholesterol",
  DietaryFiber = "Dietary Fiber",
  EnergyKJ = "Energy (kJ)",
  Fat = "Fat",
  Protein = "Protein",
  SaturatedFat = "Saturated Fat",
  Sodium = "Sodium",
  Sugar = "Sugar",
}

export type NutritionType = string;

export enum NutritionUnit {
  G = "g",
  KJ = "kJ",
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
  preferences: Preference[];
  displayLabel: boolean;
  numberOfRecipes: number;
  numberOfRecipesByCountry: { [key: string]: number };
}

export type Preference = string;

export type TotalTime = string;

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
  G = "g",
  Milliliters = "milliliters",
  Ounce = "ounce",
  Slice = "slice",
  Tablespoon = "tablespoon",
  Teaspoon = "teaspoon",
  Thumb = "thumb",
  Unit = "unit",
}
