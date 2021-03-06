import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}
  async create(createRecipeDto: Prisma.RecipeCreateInput) {
    try {
      return await this.prisma.recipe.upsert({
        create: createRecipeDto,
        update: createRecipeDto,
        where: { slug: createRecipeDto.slug },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(error);
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        console.log(error);
      }
      throw error;
    }
  }

  async findAll(user: string) {
    return await this.prisma.recipe.findMany({ where: { userId: user } });
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  async remove(id: string) {
    return await this.prisma.recipe.delete({
      where: { id: id },
    });
  }
}
