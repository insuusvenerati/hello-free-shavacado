import { PartialType } from "@nestjs/mapped-types";
import { CreateCreatedRecipeDto } from "./create-created-recipe.dto";

export class UpdateCreatedRecipeDto extends PartialType(CreateCreatedRecipeDto) {}
