import { Injectable } from "@nestjs/common";
import { UpdateCreatedRecipeDto } from "./dto/update-created-recipe.dto";
import { PrismaService } from "src/prisma.service";
import { CreateCreatedRecipeDto } from "./dto/create-created-recipe.dto";

@Injectable()
export class CreatedRecipeService {
  constructor(private prisma: PrismaService) {}

  async create(createCreatedRecipeDto: CreateCreatedRecipeDto) {
    return await this.prisma.createdRecipe.create({
      data: {
        ...createCreatedRecipeDto.recipe,
        user: {
          connectOrCreate: {
            create: {
              id: createCreatedRecipeDto.user.id,
              name: createCreatedRecipeDto.user.name,
              username: createCreatedRecipeDto.user.username,
            },
            where: {
              id: createCreatedRecipeDto.user.id,
            },
          },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.createdRecipe.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} createdRecipe`;
  }

  update(id: string, updateCreatedRecipeDto: UpdateCreatedRecipeDto) {
    return `This action updates a #${id} createdRecipe`;
  }

  remove(id: string) {
    return `This action removes a #${id} createdRecipe`;
  }
}
