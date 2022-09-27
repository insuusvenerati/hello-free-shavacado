import { IsString, ValidateNested } from "class-validator";
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

export class RecipeDto {
  @ValidateNested()
  recipe: Recipe;

  @ValidateNested()
  user: User;
}
