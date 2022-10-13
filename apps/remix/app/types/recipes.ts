export interface RecipeQuery {
  take: number;
  skip: number;
  count: number;
  total: number;
  items: Item[];
}

export interface Item {
  country: Country;
  id: string;
  name: string;
  seoName: null | string;
  category: Category;
  slug: string;
  headline: string;
  description: string;
  descriptionHTML: string;
  descriptionMarkdown: string;
  seoDescription: null | string;
  comment: null;
  difficulty: number;
  prepTime: string;
  totalTime: TotalTime | null;
  servingSize: number;
  createdAt: Date;
  updatedAt: Date;
  link: string;
  imageLink: string;
  imagePath: string;
  cardLink: null | string;
  videoLink: null;
  nutrition: Nutrition[];
  ingredients: ItemIngredient[];
  allergens: Allergen[];
  utensils: Utensil[];
  tags: Tag[];
  cuisines: Category[] | [];
  wines: string[];
  marketplaceItems: string[];
  author: null | string;
  label: Label | null;
  yieldType: string;
  yields: Yield[];
  steps: Step[];
  averageRating: number | null;
  ratingsCount: number | null;
  favoritesCount: number | null;
  active: boolean;
  highlighted: boolean;
  isDinnerToLunch: boolean;
  isExcludedFromIndex: boolean;
  isPremium: boolean;
  isAddon: boolean;
  websiteUrl: string;
  clonedFrom: null | string;
  canonical: null;
  canonicalLink: null;
  promotion: null;
  uniqueRecipeCode: null;
  uuid: null;
}

export interface Allergen {
  id: string;
  type: string;
  description: null;
  tracesOf: boolean;
  triggersTracesOf: boolean;
  iconLink: string;
  iconPath: string;
  usage: number;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  type: string;
  name: string;
  slug: string;
  iconLink: null | string;
  iconPath: string;
  usage: number;
}

export enum Country {
  Us = "US",
}

export interface ItemIngredient {
  country: Country;
  id: string;
  type: string;
  name: string;
  slug: string;
  description: string;
  internalName: null | string;
  shipped: boolean;
  imageLink: string;
  imagePath: string;
  usage: number;
  hasDuplicatedName: null;
  allergens: string[];
  family: Family;
  uuid: string;
}

export interface Family {
  id: string;
  type: string;
  description: null;
  priority: number;
  iconLink: null | string;
  iconPath: null | string;
  usageByCountry: { [key: string]: number };
  createdAt: Date;
  updatedAt: Date;
  uuid: string;
  name: string;
  slug: string;
}

export interface Label {
  text: string;
  handle: string;
  backgroundColor: string;
  foregroundColor: string;
  displayLabel: boolean;
}

export interface Nutrition {
  type: string;
  name: Name;
  amount: number;
  unit: NutritionUnit;
}

export enum Name {
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

export enum NutritionUnit {
  G = "g",
  KJ = "kJ",
  Kcal = "kcal",
  Mg = "mg",
}

export interface Step {
  index: number;
  instructionsMarkdown: string;
  instructionsHTML: string;
  instructions: string;
  timers: Timer[];
  images: Image[];
  videos: string[];
  ingredients: string[];
  utensils: string[];
}

export interface Image {
  link: string;
  path: string;
  caption: string;
}

export interface Timer {
  name: string;
  duration: string;
  temperature: null;
  temperatureUnit: null;
  ovenMode: null;
}

export interface Tag {
  id: string;
  type: string;
  iconLink: null;
  iconPath: null;
  numberOfRecipes: number;
  numberOfRecipesByCountry: { [key: string]: number };
  colorHandle: ColorHandle;
  preferences: Preference[];
  name: string;
  slug: string;
  displayLabel: boolean;
}

export enum ColorHandle {
  CalorieSmart = "calorieSmart",
  QuickPrep = "quickPrep",
  Spicy = "spicy",
}

export enum Preference {
  CalorieSmart = "Calorie Smart",
  FamilyFriendly = "Family Friendly",
  FitWholesome = "Fit & Wholesome",
  QuickEasy = "Quick & Easy",
}

export enum TotalTime {
  Pt05M = "PT05M",
  Pt10M = "PT10M",
}

export interface Utensil {
  id: string;
  type: string;
  name: string;
}

export interface Yield {
  yields: 2 | 4;
  ingredients: YieldIngredient[];
}

export interface YieldIngredient {
  id: string;
  amount: number;
  unit: IngredientUnit;
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
