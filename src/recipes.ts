export interface Recipes {
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
  totalTime: null | string;
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
  cuisines: Category[];
  wines: any[];
  marketplaceItems: any[];
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
  id: ID;
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

export enum ID {
  The57962A07B7E8697D4B3052F4 = "57962a07b7e8697d4b3052f4",
  The57962A07B7E8697D4B3052F5 = "57962a07b7e8697d4b3052f5",
  The57962A07B7E8697D4B3052F6 = "57962a07b7e8697d4b3052f6",
  The57962A07B7E8697D4B3052Fa = "57962a07b7e8697d4b3052fa",
  The5B50A59331C241Ab96E75A8B = "5b50a59331c241ab96e75a8b",
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
  description: null;
  internalName: null | string;
  shipped: boolean;
  imageLink: null | string;
  imagePath: null | string;
  usage: number;
  hasDuplicatedName: null;
  allergens: ID[];
  family: Family;
  uuid: string;
}

export interface Family {
  id: string;
  type: string;
  description: null;
  priority: number;
  iconLink: string;
  iconPath: string;
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
  name: string;
  amount: number;
  unit: NutritionUnit;
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
  videos: any[];
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
}

export enum Preference {
  CalorieSmart = "Calorie Smart",
  FitWholesome = "Fit & Wholesome",
  QuickEasy = "Quick & Easy",
}

export interface Utensil {
  id: string;
  type: string;
  name: string;
}

export interface Yield {
  yields: number;
  ingredients: YieldIngredient[];
}

export interface YieldIngredient {
  id: string;
  amount: number | null;
  unit: IngredientUnit | null;
}

export enum IngredientUnit {
  Clove = "clove",
  Cup = "cup",
  Ounce = "ounce",
  Tablespoon = "tablespoon",
  Teaspoon = "teaspoon",
  Thumb = "thumb",
  Unit = "unit",
}
