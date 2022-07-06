import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { GroceriesService } from "./groceries.service";

@Controller("groceries")
export class GroceriesController {
  constructor(private readonly groceriesService: GroceriesService) {}

  @Post()
  create(@Body() createGroceryDto: Prisma.GroceryCreateInput) {
    return this.groceriesService.create(createGroceryDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll(
    @Query("user") user: string,
    @Query("take") take: number,
    @Query("skip") skip?: number,
    @Query("orderBy") orderBy?: Prisma.GroceryOrderByWithRelationAndSearchRelevanceInput,
  ) {
    return await this.groceriesService.findAll({ skip, take, user, orderBy });
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
