import {
  CacheInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { HellofreshService } from "./hellofresh.service";

@Controller("hellofresh")
@UseInterceptors(CacheInterceptor)
export class HellofreshController {
  constructor(private readonly hellofreshService: HellofreshService) {}

  @Get()
  findAll(@Query() query) {
    if (!query.q) throw new HttpException("No query supplied", HttpStatus.NOT_FOUND);
    return this.hellofreshService.findAll(query.q, query.page);
  }

  @Get("recipe")
  findOne(@Query("q") q: string) {
    return this.hellofreshService.findOne(q);
  }

  @Get("cuisines")
  getCuisines() {
    return this.hellofreshService.getAllCuisines();
  }

  @Get("favorites")
  async getFavoriteRecipes() {
    return await this.hellofreshService.getFavoriteRecipes();
  }
}
