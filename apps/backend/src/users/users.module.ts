import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "./users.service";

@Module({
  imports: [],
  providers: [PrismaService, UsersService],
})
export class UsersModule {}
