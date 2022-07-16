import {
  CacheInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  Req,
  UseInterceptors,
} from "@nestjs/common";
import { Request } from "express";
import { HellofreshService } from "./hellofresh.service";

@Controller("hellofresh")
@UseInterceptors(CacheInterceptor)
export class HellofreshController {
  constructor(private readonly hellofreshService: HellofreshService) {}

  @Get()
  findAll(@Query() query, @Req() request: Request) {
    const token = request.headers.authorization;
    if (!query.q) throw new HttpException("No query supplied", HttpStatus.NOT_FOUND);
    return this.hellofreshService.findAll(query.q, query.page, token);
  }

  @Get("recipe")
  findOne(@Query("q") q: string, @Req() request: Request) {
    const token = request.headers.authorization;
    return this.hellofreshService.findOne(q, token);
  }

  @Get("cuisines")
  getCuisines(@Req() request: Request) {
    const token = request.headers.authorization;
    return this.hellofreshService.getAllCuisines(token);
  }

  @Get("favorites")
  async getFavoriteRecipes(@Req() request: Request) {
    const token = request.headers.authorization;
    return await this.hellofreshService.getFavoriteRecipes(token);
  }
}
