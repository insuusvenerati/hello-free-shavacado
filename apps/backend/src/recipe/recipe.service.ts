import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { RecipeDto } from "./dto/recipe.dto";

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}
  async create(createRecipeDto: RecipeDto) {
    try {
      return await this.prisma.recipe.create({
        data: {
          ...createRecipeDto.recipe,
          user: {
            connectOrCreate: {
              create: {
                id: createRecipeDto.user.id,
                username: createRecipeDto.user.username,
                name: createRecipeDto.user.name,
              },
              where: {
                id: createRecipeDto.user.id,
              },
            },
          },
        },
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
