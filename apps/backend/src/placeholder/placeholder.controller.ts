import { Controller, Get, Query } from '@nestjs/common';
import { PlaceholderService } from './placeholder.service';

@Controller('placeholder')
export class PlaceholderController {
  constructor(private readonly placeholderService: PlaceholderService) {}

  @Get()
  findAll(@Query() query) {
    return this.placeholderService.findAll(query.src);
  }
}
