import { Module } from '@nestjs/common';
import { HellofreshService } from './hellofresh.service';
import { HellofreshController } from './hellofresh.controller';

@Module({
  controllers: [HellofreshController],
  providers: [HellofreshService],
})
export class HellofreshModule {}
