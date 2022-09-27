import { IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { User } from "src/users/dto/user.dto";

class Recipe {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  uuid: string;

  @IsString()
  imagePath: string;
}

class Grocery {
  @IsString()
  ingredient: string;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsString()
  @IsOptional()
  unit: string;

  @IsString()
  @IsOptional()
  imagePath: string;

  @IsString()
  family: string;

  @IsString()
  slug: string;

  @IsString()
  uuid: string;
}

export class CreateGroceryDto {
  @ValidateNested()
  grocery: Grocery;

  @ValidateNested()
  recipe: Recipe;

  @ValidateNested()
  user: User;
}
