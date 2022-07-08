import { Module } from "@nestjs/common";
import { HellofreshService } from "./hellofresh.service";
import { HellofreshController } from "./hellofresh.controller";
import { PrismaService } from "src/prisma.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [HellofreshController],
  providers: [HellofreshService, PrismaService],
})
export class HellofreshModule {}
