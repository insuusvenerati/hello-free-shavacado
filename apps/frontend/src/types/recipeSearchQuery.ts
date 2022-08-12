export interface RecipeHit {
  name: string;
  description: string;
  id: string;
  ingredients: RecipeHitIngredient[];
  tags: RecipeHitTag[];
  _formatted: Formatted;
  slug: string;
  imagePath: string;
}

export interface Formatted {
  name: string;
  description: string;
  id: string;
  ingredients: FormattedIngredient[];
  tags: FormattedTag[];
}

export interface FormattedIngredient {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  usage: string;
  family: PurpleFamily;
  country: Country;
  shipped: boolean;
  allergens: Allergen[];
  imageLink: null | string;
  imagePath: null | string;
  description: null;
  internalName: null | string;
  hasDuplicatedName: null;
}

export enum Allergen {
  The57962A07B7E8697D4B3052F4 = "57962a07b7e8697d4b3052f4",
  The57962A07B7E8697D4B3052F5 = "57962a07b7e8697d4b3052f5",
  The57962A07B7E8697D4B3052F7 = "57962a07b7e8697d4b3052f7",
  The57962A07B7E8697D4B3052F8 = "57962a07b7e8697d4b3052f8",
  The57962A07B7E8697D4B3052F9 = "57962a07b7e8697d4b3052f9",
  The57962A07B7E8697D4B3052Fa = "57962a07b7e8697d4b3052fa",
  The5B50A59331C241Ab96E75A8B = "5b50a59331c241ab96e75a8b",
}

export enum Country {
  Us = "US",
}

export interface PurpleFamily {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  iconLink: null | string;
  iconPath: null | string;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
  description: null;
  usageByCountry: ByCountry;
}

export interface ByCountry {
  AO: string;
  AT: string;
  AU: string;
  BE: string;
  CA: string;
  CF: string;
  CG: string;
  CH: string;
  CK: string;
  DE: string;
  DK: string;
  ER: string;
  ES: string;
  FJ: string;
  FR: string;
  GB: string;
  GN: string;
  GQ: string;
  IE: string;
  IT: string;
  JP: string;
  LU: string;
  MR: string;
  NL: string;
  NO: string;
  NZ: string;
  SE: string;
  US: string;
  YE: string;
}

export interface FormattedTag {
  id: string;
  name: string;
  slug: string;
  type: string;
  iconLink: null | string;
  iconPath: null | string;
  colorHandle: null | string;
  preferences: string[];
  displayLabel: boolean;
  numberOfRecipes: string;
  numberOfRecipesByCountry: ByCountry;
}

export interface RecipeHitIngredient {
  id: string;
  name: string;
  slug: string;
  type: string;
  uuid: string;
  usage: number;
  family: FluffyFamily;
  country: Country;
  shipped: boolean;
  allergens: Allergen[];
  imageLink: null | string;
  imagePath: null | string;
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
  iconLink: null | string;
  iconPath: null | string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  description: null;
  usageByCountry: { [key: string]: number };
}

export interface RecipeHitTag {
  id: string;
  name: string;
  slug: string;
  type: string;
  iconLink: null | string;
  iconPath: null | string;
  colorHandle: null | string;
  preferences: string[];
  displayLabel: boolean;
  numberOfRecipes: number;
  numberOfRecipesByCountry: { [key: string]: number };
}
