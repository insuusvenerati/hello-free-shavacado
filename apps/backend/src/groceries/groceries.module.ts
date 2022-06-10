import { Module } from "@nestjs/common";
import { GroceriesService } from "./groceries.service";
import { GroceriesController } from "./groceries.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [GroceriesController],
  providers: [GroceriesService, PrismaService],
})
export class GroceriesModule {}
