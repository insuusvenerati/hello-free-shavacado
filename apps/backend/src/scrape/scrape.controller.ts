import { Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { ScrapeService } from "./scrape.service";

@Controller("scrape")
export class ScrapeController {
  constructor(private readonly scrapeService: ScrapeService) {}

  @Post()
  create(@Query("url") url: string, @Query("user") user: string) {
    return this.scrapeService.create({ url, user });
  }

  @Get(":id")
  findOneByUser(@Param("id") id: string, @Query("user") user: string) {
    return this.scrapeService.findOneByUser(id, user);
  }

  @Get("one/:id")
  findOne(@Param("id") id: string) {
    return this.scrapeService.findOne(id);
  }

  @Get("imported/all")
  async findAll() {
    return this.scrapeService.findAll();
  }

  @Get()
  async findAllByUser(@Query("user") user: string) {
    return this.scrapeService.findAllByUser(user);
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
