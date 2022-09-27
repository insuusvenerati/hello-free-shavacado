import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { CreateGroceryDto } from "./dto/create-grocery.dto";

@Injectable()
export class GroceriesService {
  constructor(private prisma: PrismaService) {}

  async create(createGroceryDto: CreateGroceryDto) {
    return await this.prisma.grocery.create({
      data: {
        ...createGroceryDto.grocery,
        recipe: {
          connectOrCreate: {
            create: {
              ...createGroceryDto.recipe,
            },
            where: {
              uuid: createGroceryDto.recipe.uuid,
            },
          },
        },
        user: {
          connectOrCreate: {
            create: {
              ...createGroceryDto.user,
            },
            where: {
              id: createGroceryDto.user.id,
            },
          },
        },
      },
    });
  }

  async findAll(params: {
    user: string;
    take: number;
    skip?: number;
    orderBy?: Prisma.GroceryOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { user, take, skip, orderBy } = params;

    if (isNaN(skip)) {
      return await this.prisma.grocery.findMany({
        where: { userId: user },
        take,
        orderBy,
      });
    }

    return await this.prisma.grocery.findMany({
      where: { userId: user },
      skip,
      take,
    });
  }

  async count(user: string) {
    return await this.prisma.grocery.groupBy({
      by: ["ingredient"],
      _sum: {
        amount: true,
      },
      where: { userId: user },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} grocery`;
  }

  remove(id: number) {
    return `This action removes a #${id} grocery`;
  }
}
