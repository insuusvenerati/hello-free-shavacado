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
  The57962A07B7E8697D4B3052F5 = '57962a07b7e8697d4b3052f5',
  The57962A07B7E8697D4B3052F6 = '57962a07b7e8697d4b3052f6',
  The57962A07B7E8697D4B3052F7 = '57962a07b7e8697d4b3052f7',
  The57962A07B7E8697D4B3052F8 = '57962a07b7e8697d4b3052f8',
  The57962A07B7E8697D4B3052F9 = '57962a07b7e8697d4b3052f9',
  The57962A07B7E8697D4B3052Fa = '57962a07b7e8697d4b3052fa',
  The5B50A59331C241Ab96E75A8B = '5b50a59331c241ab96e75a8b',
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
  Us = 'US',
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
  imageLink: string;
  imagePath: string;
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
  type: Type;
  name: Name;
  amount: number;
  unit: NutritionUnit;
}

export enum Name {
  Calories = 'Calories',
  Carbohydrate = 'Carbohydrate',
  Cholesterol = 'Cholesterol',
  DietaryFiber = 'Dietary Fiber',
  EnergyKJ = 'Energy (kJ)',
  Fat = 'Fat',
  Protein = 'Protein',
  SaturatedFat = 'Saturated Fat',
  Sodium = 'Sodium',
  Sugar = 'Sugar',
}

export enum Type {
  The57B42A48B7E8697D4B305304 = '57b42a48b7e8697d4b305304',
  The57B42A48B7E8697D4B305305 = '57b42a48b7e8697d4b305305',
  The57B42A48B7E8697D4B305306 = '57b42a48b7e8697d4b305306',
  The57B42A48B7E8697D4B305307 = '57b42a48b7e8697d4b305307',
  The57B42A48B7E8697D4B305308 = '57b42a48b7e8697d4b305308',
  The57B42A48B7E8697D4B305309 = '57b42a48b7e8697d4b305309',
  The57B42A48B7E8697D4B30530A = '57b42a48b7e8697d4b30530a',
  The57B42A48B7E8697D4B30530B = '57b42a48b7e8697d4b30530b',
  The57B42A48B7E8697D4B30530C = '57b42a48b7e8697d4b30530c',
  The57B42A48B7E8697D4B30530D = '57b42a48b7e8697d4b30530d',
}

export enum NutritionUnit {
  G = 'g',
  KJ = 'kJ',
  Kcal = 'kcal',
  Mg = 'mg',
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
  CalorieSmart = 'calorieSmart',
  QuickPrep = 'quickPrep',
  Spicy = 'spicy',
}

export enum Preference {
  CalorieSmart = 'Calorie Smart',
  FamilyFriendly = 'Family Friendly',
  FitWholesome = 'Fit & Wholesome',
  QuickEasy = 'Quick & Easy',
}

export enum TotalTime {
  Pt05M = 'PT05M',
  Pt10M = 'PT10M',
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
  Clove = 'clove',
  Cup = 'cup',
  G = 'g',
  Milliliters = 'milliliters',
  Ounce = 'ounce',
  Slice = 'slice',
  Tablespoon = 'tablespoon',
  Teaspoon = 'teaspoon',
  Unit = 'unit',
}
