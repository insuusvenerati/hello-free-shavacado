import { Module } from "@nestjs/common";
import { CreatedRecipeService } from "./created-recipe.service";
import { CreatedRecipeController } from "./created-recipe.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [CreatedRecipeController],
  providers: [CreatedRecipeService, PrismaService],
})
export class CreatedRecipeModule {}
