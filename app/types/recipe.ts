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
  country: Country;
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
  createdAt: Date;
  imageLink: string;
  imagePath: string;
  isPremium: boolean;
  nutrition: Nutrition[];
  promotion: null;
  totalTime: TotalTime | null;
  updatedAt: Date;
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
  id: ID;
  name: AllergenName;
  slug: Slug;
  type: AllergenType;
  usage: number;
  iconLink: string;
  iconPath: IconPath;
  tracesOf: boolean;
  description: null;
  triggersTracesOf: boolean;
}

export enum IconPath {
  Allergens57962A07B7E8697D4B3052F5E20D9Ca4PNG = "/allergens/57962a07b7e8697d4b3052f5-e20d9ca4.png",
  Allergens57962A07B7E8697D4B3052F663Afd198PNG = "/allergens/57962a07b7e8697d4b3052f6-63afd198.png",
  Allergens57962A07B7E8697D4B3052F7Feb8E168PNG = "/allergens/57962a07b7e8697d4b3052f7-feb8e168.png",
  Allergens57962A07B7E8697D4B3052F8B2Ad43CDPNG = "/allergens/57962a07b7e8697d4b3052f8-b2ad43cd.png",
  Allergens57962A07B7E8697D4B3052F9Feb8E168PNG = "/allergens/57962a07b7e8697d4b3052f9-feb8e168.png",
  Allergens57962A07B7E8697D4B3052FaBe127D3FPNG = "/allergens/57962a07b7e8697d4b3052fa-be127d3f.png",
  Allergens57962A07B7E8697D4B3052Fb172B155CPNG = "/allergens/57962a07b7e8697d4b3052fb-172b155c.png",
}

export enum ID {
  The57962A07B7E8697D4B3052F5 = "57962a07b7e8697d4b3052f5",
  The57962A07B7E8697D4B3052F6 = "57962a07b7e8697d4b3052f6",
  The57962A07B7E8697D4B3052F7 = "57962a07b7e8697d4b3052f7",
  The57962A07B7E8697D4B3052F8 = "57962a07b7e8697d4b3052f8",
  The57962A07B7E8697D4B3052F9 = "57962a07b7e8697d4b3052f9",
  The57962A07B7E8697D4B3052Fa = "57962a07b7e8697d4b3052fa",
  The5B50A59331C241Ab96E75A8B = "5b50a59331c241ab96e75a8b",
}

export enum AllergenName {
  Eggs = "Eggs",
  Fish = "Fish",
  Milk = "Milk",
  Peanuts = "Peanuts",
  Soy = "Soy",
  TreeNuts = "Tree Nuts",
  Wheat = "Wheat",
}

export enum Slug {
  Egg = "egg",
  Fish = "fish",
  Milk = "milk",
  Peanuts = "peanuts",
  Soy = "soy",
  TreeNuts = "tree-nuts",
  Wheat = "wheat",
}

export enum AllergenType {
  Egg = "egg",
  Fish = "fish",
  Gluten = "gluten",
  Milk = "milk",
  NutsNonIs = "nuts-non-is",
  Peanuts = "peanuts",
  Soya = "soya",
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

export interface ItemIngredient {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  usage: number;
  family: Family;
  country: Country;
  shipped: boolean;
  allergens: ID[];
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
  createdAt: Date;
  updatedAt: Date;
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

export enum ForegroundColor {
  Ffffff = "#FFFFFF",
  ForegroundColorFfffff = "#ffffff",
  The000000 = "#000000",
}

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

export enum NutritionType {
  The57B42A48B7E8697D4B305304 = "57b42a48b7e8697d4b305304",
  The57B42A48B7E8697D4B305305 = "57b42a48b7e8697d4b305305",
  The57B42A48B7E8697D4B305306 = "57b42a48b7e8697d4b305306",
  The57B42A48B7E8697D4B305307 = "57b42a48b7e8697d4b305307",
  The57B42A48B7E8697D4B305308 = "57b42a48b7e8697d4b305308",
  The57B42A48B7E8697D4B305309 = "57b42a48b7e8697d4b305309",
  The57B42A48B7E8697D4B30530A = "57b42a48b7e8697d4b30530a",
  The57B42A48B7E8697D4B30530B = "57b42a48b7e8697d4b30530b",
  The57B42A48B7E8697D4B30530C = "57b42a48b7e8697d4b30530c",
  The57B42A48B7E8697D4B30530D = "57b42a48b7e8697d4b30530d",
}

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

export enum Preference {
  CalorieSmart = "Calorie Smart",
  EasyPlate = "EasyPlate",
  FitWholesome = "Fit & Wholesome",
  QuickEasy = "Quick & Easy",
}

export enum TotalTime {
  Pt05M = "PT05M",
  Pt10M = "PT10M",
  Pt15M = "PT15M",
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
  G = "g",
  Milliliters = "milliliters",
  Ounce = "ounce",
  Slice = "slice",
  Tablespoon = "tablespoon",
  Teaspoon = "teaspoon",
  Thumb = "thumb",
  Unit = "unit",
}
