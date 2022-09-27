import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreatedRecipeService } from "./created-recipe.service";
import { CreateCreatedRecipeDto } from "./dto/create-created-recipe.dto";
import { UpdateCreatedRecipeDto } from "./dto/update-created-recipe.dto";

@Controller("created-recipe")
export class CreatedRecipeController {
  constructor(private readonly createdRecipeService: CreatedRecipeService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createCreatedRecipeDto: CreateCreatedRecipeDto) {
    return this.createdRecipeService.create(createCreatedRecipeDto);
  }

  @Get()
  findAll() {
    return this.createdRecipeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.createdRecipeService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateCreatedRecipeDto: UpdateCreatedRecipeDto) {
    return this.createdRecipeService.update(id, updateCreatedRecipeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.createdRecipeService.remove(id);
  }
}
