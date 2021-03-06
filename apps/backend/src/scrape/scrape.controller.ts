import { Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ScrapeService } from "./scrape.service";

@Controller("scrape")
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post()
  create(@Query() query) {
    return this.scrapeService.create({ url: query.url, user: query.user });
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Query("user") user: string) {
    return this.scrapeService.findOne(id, user);
  }

  @Get()
  async findAll(@Query("user") user: string) {
    return this.scrapeService.findAll(user);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.scrapeService.update(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Query("user") user: string) {
    return this.scrapeService.remove(id, user);
  }
}
