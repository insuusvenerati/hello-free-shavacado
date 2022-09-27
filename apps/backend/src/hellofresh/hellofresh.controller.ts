import {
  CacheInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Ingredient } from "@prisma/client";
import { Request } from "express";
import { IngredientsParamsDTO } from "./dto/params.dto";
import { HellofreshService } from "./hellofresh.service";

@Controller("hellofresh")
@UseInterceptors(CacheInterceptor)
export class HellofreshController {
  constructor(private readonly hellofreshService: HellofreshService) {}

  @Get()
  findAll(@Query("q") q: string, @Query("page") page: number) {
    return this.hellofreshService.findAll(q, page);
  }

  @Get("recipe/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  findOneById(@Param("id") id: string) {
    return this.hellofreshService.findOneById(id);
  }

  @Get("cuisines")
  getCuisines(@Req() request: Request) {
    const token = request.headers.authorization;
    return this.hellofreshService.getAllCuisines(token);
  }

  @Get("favorites")
  async getFavoriteRecipes() {
    return await this.hellofreshService.getFavoriteRecipes();
  }

  @Get("ingredients")
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  async getAllIngredients(@Query() params: IngredientsParamsDTO) {
    return await this.hellofreshService.getAllIngredients(params);
  }

  @Post("scrapeIngredients")
  async scrapeIngredients(): Promise<Ingredient[]> {
    return await this.hellofreshService.scrapeIngredients();
  }

  @Post("refreshFavoriteRecipes")
  async refreshFavoriteRecipes() {
    return await this.hellofreshService.refreshFavoriteRecipes();
  }

  @Post("scrapeRecipes")
  async scrapeRecipes() {
    return await this.hellofreshService.scrapeRecipes();
  }
}
