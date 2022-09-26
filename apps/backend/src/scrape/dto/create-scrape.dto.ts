import { IsString } from "class-validator";

export class CreateScrapeDto {
  @IsString()
  url: string;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;

  @IsString()
  cookTime: string;

  @IsString()
  prepTime: string;

  @IsString()
  totalTime: string;

  @IsString()
  recipeYield: string;

  @IsString({ each: true })
  recipeIngredients: string[];

  @IsString({ each: true })
  recipeInstructions: string[];

  @IsString({ each: true })
  recipeCategories: string[];

  @IsString({ each: true })
  recipeCuisines: string[];

  @IsString({ each: true })
  recipeTypes: string[];

  @IsString({ each: true })
  keywords: string[];
}
