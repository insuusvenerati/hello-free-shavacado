import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}
  async create(createRecipeDto: Prisma.RecipesCreateInput) {
    return await this.prisma.recipes.create({
      data: createRecipeDto,
    });
  }

  async findAll() {
    return await this.prisma.recipes.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  async remove(id: string) {
    return await this.prisma.recipes.delete({
      where: { id: id },
    });
  }
}
