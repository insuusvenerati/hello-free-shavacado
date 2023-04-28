import { z } from "zod";

export const allergenSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  usage: z.number(),
  iconLink: z.string(),
  iconPath: z.string(),
  tracesOf: z.boolean(),
  description: z.null(),
  triggersTracesOf: z.boolean(),
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  usage: z.number(),
  iconLink: z.string().nullable(),
  iconPath: z.string(),
});

export const familySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  uuid: z.string(),
  iconLink: z.string().nullable(),
  iconPath: z.string().nullable(),
  priority: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  description: z.null(),
  usageByCountry: z.record(z.number()),
});

export const foregroundColorSchema = z.string();

export const nutritionNameSchema = z.enum([
  "Calories",
  "Carbohydrate",
  "Cholesterol",
  "Dietary Fiber",
  "Energy (kJ)",
  "Fat",
  "Protein",
  "Saturated Fat",
  "Sodium",
  "Sugar",
]);

export const nutritionTypeSchema = z.string();

export const nutritionUnitSchema = z.enum(["g", "kJ", "kcal", "mg"]);

export const imageSchema = z.object({
  link: z.string(),
  path: z.string(),
  caption: z.string(),
});

export const timerSchema = z.object({
  name: z.string(),
  duration: z.string(),
  ovenMode: z.null(),
  temperature: z.null(),
  temperatureUnit: z.null(),
});

export const preferenceSchema = z.string();

export const totalTimeSchema = z.string();

export const utensilSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
});

export const ingredientUnitSchema = z.enum([
  "clove",
  "cup",
  "g",
  "milliliters",
  "ounce",
  "slice",
  "tablespoon",
  "teaspoon",
  "thumb",
  "unit",
]);

export const itemIngredientSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  uuid: z.string(),
  usage: z.number(),
  family: familySchema,
  country: z.string(),
  shipped: z.boolean(),
  allergens: z.array(z.string()),
  imageLink: z.string().nullable(),
  imagePath: z.string().nullable(),
  description: z.null(),
  internalName: z.string().nullable(),
  hasDuplicatedName: z.null(),
});

export const labelSchema = z.object({
  text: z.string(),
  handle: z.string(),
  displayLabel: z.boolean(),
  backgroundColor: z.string(),
  foregroundColor: foregroundColorSchema,
});

export const nutritionSchema = z.object({
  name: nutritionNameSchema,
  type: nutritionTypeSchema,
  unit: nutritionUnitSchema,
  amount: z.number(),
});

export const stepSchema = z.object({
  index: z.number(),
  images: z.array(imageSchema),
  timers: z.array(timerSchema),
  videos: z.array(z.any()),
  utensils: z.array(z.string()),
  ingredients: z.array(z.string()),
  instructions: z.string(),
  instructionsHTML: z.string(),
  instructionsMarkdown: z.string(),
});

export const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  type: z.string(),
  iconLink: z.string().nullable(),
  iconPath: z.string().nullable(),
  colorHandle: z.string(),
  preferences: z.array(preferenceSchema),
  displayLabel: z.boolean(),
  numberOfRecipes: z.number(),
  numberOfRecipesByCountry: z.record(z.number()),
});

export const yieldIngredientSchema = z.object({
  id: z.string(),
  unit: ingredientUnitSchema.nullable(),
  amount: z.number().nullable(),
});

export const yieldSchema = z.object({
  yields: z.number(),
  ingredients: z.array(yieldIngredientSchema),
});

export const itemSchema = z.object({
  id: z.string(),
  link: z.string(),
  name: z.string(),
  slug: z.string(),
  tags: z.array(tagSchema),
  uuid: z.null(),
  label: labelSchema.nullable(),
  steps: z.array(stepSchema),
  wines: z.array(z.any()),
  active: z.boolean(),
  author: z.string().nullable(),
  yields: z.array(yieldSchema),
  comment: z.null(),
  country: z.string(),
  isAddon: z.boolean(),
  seoName: z.string().nullable(),
  cardLink: z.string().nullable(),
  category: categorySchema.nullable(),
  cuisines: z.array(categorySchema),
  headline: z.string(),
  prepTime: z.string(),
  utensils: z.array(utensilSchema),
  allergens: z.array(allergenSchema),
  canonical: z.null(),
  createdAt: z.string(),
  imageLink: z.string(),
  imagePath: z.string(),
  isPremium: z.boolean(),
  nutrition: z.array(nutritionSchema),
  promotion: z.null(),
  totalTime: totalTimeSchema.nullable(),
  updatedAt: z.string(),
  videoLink: z.null(),
  yieldType: z.string(),
  clonedFrom: z.string().nullable(),
  difficulty: z.number(),
  websiteUrl: z.string(),
  description: z.string(),
  highlighted: z.boolean(),
  ingredients: z.array(itemIngredientSchema),
  servingSize: z.number(),
  ratingsCount: z.number(),
  averageRating: z.number().nullable(),
  canonicalLink: z.null(),
  favoritesCount: z.number(),
  seoDescription: z.string().nullable(),
  descriptionHTML: z.string(),
  isDinnerToLunch: z.boolean(),
  marketplaceItems: z.array(z.any()),
  uniqueRecipeCode: z.null(),
  descriptionMarkdown: z.string(),
  isExcludedFromIndex: z.boolean(),
});

export const recipesSchema = z.object({
  take: z.number(),
  skip: z.number(),
  count: z.number(),
  total: z.number(),
  items: z.array(itemSchema),
});
