import { Module } from "@nestjs/common";
import { HellofreshService } from "./hellofresh.service";
import { HellofreshController } from "./hellofresh.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [HellofreshController],
  providers: [HellofreshService, PrismaService],
})
export class HellofreshModule {}
