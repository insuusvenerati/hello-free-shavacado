import { IsArray, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { User } from "src/users/dto/user.dto";

export class Recipe {
  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;

  @IsOptional()
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsArray()
  @IsOptional()
  ingredients: string[];

  @IsArray()
  @IsOptional()
  steps: string[];

  @IsString()
  @IsOptional()
  difficulty: string;

  @IsArray()
  @IsOptional()
  tags: string[];

  @IsOptional()
  image: string;
}

export class CreateCreatedRecipeDto {
  @ValidateNested()
  recipe: Recipe;

  @ValidateNested()
  user: User;
}
