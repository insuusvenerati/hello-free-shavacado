import { Controller, Get, Query } from '@nestjs/common';
import { HellofreshService } from './hellofresh.service';

@Controller('hellofresh')
export class HellofreshController {
  constructor(private readonly hellofreshService: HellofreshService) {}

  @Get()
  findAll(@Query() query) {
    return this.hellofreshService.findAll(query.q, query.page);
  }

  @Get('recipe')
  findONe(@Query() query) {
    return this.hellofreshService.findOne(query.q);
  }

  @Get('cuisines')
  getCuisines() {
    return this.hellofreshService.getAllCuisines();
  }

  @Get('favorites')
  async getFavoriteRecipes() {
    return await this.hellofreshService.getFavoriteRecipes();
  }
}
