import { Body, Controller, Delete, Get, Param, Post, Query } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { GroceriesService } from "./groceries.service";

@Controller("groceries")
export class GroceriesController {
  constructor(private readonly groceriesService: GroceriesService) {}

  @Post()
  create(@Body() createGroceryDto: Prisma.GroceriesCreateInput) {
    return this.groceriesService.create(createGroceryDto);
  }

  @Get()
  findAll(@Query("user") user: string) {
    return this.groceriesService.findAll(user);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.groceriesService.findOne(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.groceriesService.remove(+id);
  }
}
