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
    return await this.prisma.grocery.findMany({
      where: { userId: user },
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
