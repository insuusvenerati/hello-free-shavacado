export interface Ingredient {
  createdAt: Date;
  updatedAt: Date;
  id: string;
  country: Country;
  type: string;
  slug: string;
  description: null;
  internalName: null | string;
  shipped: boolean;
  imageLink: string;
  imagePath: string;
  usage: number;
  hasDuplicatedName: null;
  uuid: string;
  name: string;
  allergens: Allergen[];
  family: Family;
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

export enum Country {
  Us = "US",
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
