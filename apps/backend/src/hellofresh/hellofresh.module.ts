import { Module } from "@nestjs/common";
import { HellofreshService } from "./hellofresh.service";
import { HellofreshController } from "./hellofresh.controller";
import { PrismaService } from "src/prisma.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  controllers: [HellofreshController],
  imports: [ScheduleModule.forRoot()],
  providers: [HellofreshService, PrismaService],
})
export class HellofreshModule {}
