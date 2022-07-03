import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GroceriesService {
  constructor(private prisma: PrismaService) {}
  async create(createGroceryDto: Prisma.GroceryCreateInput) {
    return await this.prisma.grocery.create({
      data: createGroceryDto,
    });
  }

  async findAll(user: string) {
    const groceries = await this.prisma.grocery.findMany({
      where: { userId: user },
      select: {
        ingredient: true,
        imagePath: true,
        id: true,
        slug: true,
        family: true,
        uuid: true,
      },
    });

    const ingredientsGroup = await this.prisma.grocery.groupBy({
      by: ["ingredient", "unit"],
      where: { userId: user },
      _sum: {
        amount: true,
      },
    });

    return {
      groceries,
      ingredientsGroup,
    };
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
