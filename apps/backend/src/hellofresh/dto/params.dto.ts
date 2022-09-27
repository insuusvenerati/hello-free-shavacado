import { Prisma } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

export class IngredientsParamsDTO {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  skip?: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  take?: number;

  @IsOptional()
  cursor?: Prisma.IngredientWhereUniqueInput;

  @IsOptional()
  where?: Prisma.IngredientWhereInput;

  @IsOptional()
  orderBy?: Prisma.IngredientOrderByWithRelationAndSearchRelevanceInput;
}
