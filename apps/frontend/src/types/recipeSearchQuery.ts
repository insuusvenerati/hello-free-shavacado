// Generated by https://quicktype.io

import { Item } from "./recipes";

export interface RecipeSearchQuery {
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  recipe: Item;
  id: string;
  _highlightResult: TResult;
  _snippetResult: TResult;
  __position: number;
}

export interface TResult {
  name: PuneHedgehog;
  description: PuneHedgehog;
  createdAt: PuneHedgehog;
  updatedAt: PuneHedgehog;
  recipe: HighlightResultRecipe;
  id: PuneHedgehog;
}

export interface PuneHedgehog {
  value: string;
}

export interface HighlightResultRecipe {
  id: PuneHedgehog;
  link: PuneHedgehog;
  name: PuneHedgehog;
  slug: PuneHedgehog;
  tags: PurpleTag[];
  uuid: PuneHedgehog;
  label: PuneHedgehog;
  steps: PurpleStep[];
  wines: any[];
  active: PuneHedgehog;
  author: PuneHedgehog;
  yields: PurpleYield[];
  comment: PuneHedgehog;
  country: PuneHedgehog;
  isAddon: PuneHedgehog;
  seoName: PuneHedgehog;
  cardLink: PuneHedgehog;
  category: PurpleCategory;
  cuisines: PurpleCategory[];
  headline: PuneHedgehog;
  prepTime: PuneHedgehog;
  utensils: PurpleUtensil[];
  allergens: PurpleAllergen[];
  canonical: PuneHedgehog;
  createdAt: PuneHedgehog;
  imageLink: PuneHedgehog;
  imagePath: PuneHedgehog;
  isPremium: PuneHedgehog;
  nutrition: PurpleNutrition[];
  promotion: PuneHedgehog;
  totalTime: PuneHedgehog;
  updatedAt: PuneHedgehog;
  videoLink: PuneHedgehog;
  yieldType: PuneHedgehog;
  clonedFrom: PuneHedgehog;
  difficulty: PuneHedgehog;
  websiteUrl: PuneHedgehog;
  description: PuneHedgehog;
  highlighted: PuneHedgehog;
  ingredients: PurpleIngredient[];
  servingSize: PuneHedgehog;
  ratingsCount: PuneHedgehog;
  averageRating: PuneHedgehog;
  canonicalLink: PuneHedgehog;
  favoritesCount: PuneHedgehog;
  seoDescription: PuneHedgehog;
  descriptionHTML: PuneHedgehog;
  isDinnerToLunch: PuneHedgehog;
  marketplaceItems: any[];
  uniqueRecipeCode: PuneHedgehog;
  descriptionMarkdown: PuneHedgehog;
  isExcludedFromIndex: PuneHedgehog;
}

export interface PurpleAllergen {
  id: PuneHedgehog;
  name: PuneHedgehog;
  slug: PuneHedgehog;
  type: PuneHedgehog;
  usage: PuneHedgehog;
  iconLink: PuneHedgehog;
  iconPath: PuneHedgehog;
  tracesOf: PuneHedgehog;
  description: PuneHedgehog;
  triggersTracesOf: PuneHedgehog;
}

export interface PurpleCategory {
  id: PuneHedgehog;
  name: PuneHedgehog;
  slug: PuneHedgehog;
  type: PuneHedgehog;
  usage: PuneHedgehog;
  iconLink: PuneHedgehog;
  iconPath: PuneHedgehog;
}

export interface PurpleIngredient {
  id: PuneHedgehog;
  name: PuneHedgehog;
  slug: PuneHedgehog;
  type: PuneHedgehog;
  uuid: PuneHedgehog;
  usage: PuneHedgehog;
  family: PurpleFamily;
  country: PuneHedgehog;
  shipped: PuneHedgehog;
  allergens: PuneHedgehog[];
  imageLink: PuneHedgehog;
  imagePath: PuneHedgehog;
  description: PuneHedgehog;
  internalName: PuneHedgehog;
  hasDuplicatedName: PuneHedgehog;
}

export interface PurpleFamily {
  id: PuneHedgehog;
  name: PuneHedgehog;
  slug: PuneHedgehog;
  type: PuneHedgehog;
  uuid: PuneHedgehog;
  iconLink: PuneHedgehog;
  iconPath: PuneHedgehog;
  priority: PuneHedgehog;
  createdAt: PuneHedgehog;
  updatedAt: PuneHedgehog;
  description: PuneHedgehog;
  usageByCountry: { [key: string]: PuneHedgehog };
}

export interface PurpleNutrition {
  name: PuneHedgehog;
  type: PuneHedgehog;
  unit: PuneHedgehog;
  amount: PuneHedgehog;
}

export interface PurpleStep {
  index: PuneHedgehog;
  images: PurpleImage[];
  timers: PurpleTimer[];
  videos: any[];
  utensils: PuneHedgehog[];
  ingredients: PuneHedgehog[];
  instructions: PuneHedgehog;
  instructionsHTML: PuneHedgehog;
  instructionsMarkdown: PuneHedgehog;
}

export interface PurpleImage {
  link: PuneHedgehog;
  path: PuneHedgehog;
  caption: PuneHedgehog;
}

export interface PurpleTimer {
  name: PuneHedgehog;
  duration: PuneHedgehog;
  ovenMode: PuneHedgehog;
  temperature: PuneHedgehog;
  temperatureUnit: PuneHedgehog;
}

export interface PurpleTag {
  id: PuneHedgehog;
  name: PuneHedgehog;
  slug: PuneHedgehog;
  type: PuneHedgehog;
  iconLink: PuneHedgehog;
  iconPath: PuneHedgehog;
  colorHandle: PuneHedgehog;
  preferences: any[];
  displayLabel: PuneHedgehog;
  numberOfRecipes: PuneHedgehog;
  numberOfRecipesByCountry: { [key: string]: PuneHedgehog };
}

export interface PurpleUtensil {
  id: PuneHedgehog;
  name: PuneHedgehog;
  type: PuneHedgehog;
}

export interface PurpleYield {
  yields: PuneHedgehog;
  ingredients: FluffyIngredient[];
}

export interface FluffyIngredient {
  id: PuneHedgehog;
  unit: PuneHedgehog;
  amount: PuneHedgehog;
}

export interface RecipeSearchQueryRecipe {
  id: string;
  link: string;
  name: string;
  slug: string;
  tags: FluffyTag[];
  uuid: null;
  label: null;
  steps: FluffyStep[];
  wines: any[];
  active: boolean;
  author: null;
  yields: FluffyYield[];
  comment: null;
  country: Country;
  isAddon: boolean;
  seoName: string;
  cardLink: string;
  category: FluffyCategory;
  cuisines: FluffyCategory[];
  headline: string;
  prepTime: string;
  utensils: FluffyUtensil[];
  allergens: FluffyAllergen[];
  canonical: null;
  createdAt: string;
  imageLink: string;
  imagePath: string;
  isPremium: boolean;
  nutrition: FluffyNutrition[];
  promotion: null;
  totalTime: string;
  updatedAt: string;
  videoLink: null;
  yieldType: string;
  clonedFrom: string;
  difficulty: number;
  websiteUrl: string;
  description: string;
  highlighted: boolean;
  ingredients: TentacledIngredient[];
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

export interface FluffyAllergen {
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

export interface FluffyCategory {
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

export interface TentacledIngredient {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  usage: number;
  family: FluffyFamily;
  country: Country;
  shipped: boolean;
  allergens: string[];
  imageLink: string;
  imagePath: string;
  description: null;
  internalName: null | string;
  hasDuplicatedName: null;
}

export interface FluffyFamily {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  iconLink: string;
  iconPath: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
  description: null;
  usageByCountry: { [key: string]: number };
}

export interface FluffyNutrition {
  name: string;
  type: string;
  unit: string;
  amount: number;
}

export interface FluffyStep {
  index: number;
  images: FluffyImage[];
  timers: FluffyTimer[];
  videos: any[];
  utensils: string[];
  ingredients: string[];
  instructions: string;
  instructionsHTML: string;
  instructionsMarkdown: string;
}

export interface FluffyImage {
  link: string;
  path: string;
  caption: string;
}

export interface FluffyTimer {
  name: string;
  duration: string;
  ovenMode: null;
  temperature: null;
  temperatureUnit: null;
}

export interface FluffyTag {
  id: string;
  name: string;
  slug: string;
  type: string;
  iconLink: null;
  iconPath: null;
  colorHandle: string;
  preferences: any[];
  displayLabel: boolean;
  numberOfRecipes: number;
  numberOfRecipesByCountry: { [key: string]: number };
}

export interface FluffyUtensil {
  id: string;
  name: string;
  type: string;
}

export interface FluffyYield {
  yields: number;
  ingredients: StickyIngredient[];
}

export interface StickyIngredient {
  id: string;
  unit: null;
  amount: number | null;
}
