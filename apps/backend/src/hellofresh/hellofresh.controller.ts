import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Request } from "express";
import { HellofreshService } from "./hellofresh.service";

@Controller("hellofresh")
@UseInterceptors(CacheInterceptor)
export class HellofreshController {
  constructor(private readonly hellofreshService: HellofreshService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  findAll(@Query("q") q: string, @Query("page") page: number, @Req() request: Request) {
    const token = request.headers.authorization;
    if (!token) throw new HttpException("No valid token", HttpStatus.FORBIDDEN);
    if (!q) throw new HttpException("No query supplied", HttpStatus.NOT_FOUND);
    return this.hellofreshService.findAll(q, page, token);
  }

  // @Get("recipe")
  // @UsePipes(new ValidationPipe({ transform: true }))
  // @CacheTTL(60)
  // findOne(@Query("q") q: string, @Req() request: Request) {
  //   const token = request.headers.authorization;
  //   return this.hellofreshService.findOne(q, token);
  // }

  @Get("recipe/:id")
  @UsePipes(new ValidationPipe({ transform: true }))
  @CacheTTL(0)
  findOneById(@Param("id") id: string) {
    return this.hellofreshService.findOneById(id);
  }

  @Get("cuisines")
  getCuisines(@Req() request: Request) {
    const token = request.headers.authorization;
    return this.hellofreshService.getAllCuisines(token);
  }

  @Get("favorites")
  @CacheTTL(60 * 60 * 24)
  async getFavoriteRecipes() {
    return await this.hellofreshService.getFavoriteRecipes();
  }

  @Post("scrapeIngredients")
  async scrapeIngredients() {
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
