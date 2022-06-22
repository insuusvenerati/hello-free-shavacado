import { Module } from "@nestjs/common";
import { ScrapeService } from "./scrape.service";
import { ScrapeController } from "./scrape.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  controllers: [ScrapeController],
  providers: [ScrapeService, PrismaService],
})
export class ScrapeModule {}
