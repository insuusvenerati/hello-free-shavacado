import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { Recipes as RecipeModel } from "@prisma/client";
import { RecipeService } from "./recipe.service";

@Controller("recipe")
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  create(
    @Body()
    recipeData: {
      recipe: string;
      userId: string;
      name: string;
      imagePath: string;
    },
  ): Promise<RecipeModel> {
    return this.recipeService.create(recipeData);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.recipeService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.recipeService.remove(id);
  }
}
