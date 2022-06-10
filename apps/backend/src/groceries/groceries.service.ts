import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GroceriesService {
  constructor(private prisma: PrismaService) {}
  async create(createGroceryDto: Prisma.GroceriesCreateInput) {
    return this.prisma.groceries.create({
      data: createGroceryDto,
    });
  }

  findAll(user: string) {
    return this.prisma.groceries.findMany({
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
