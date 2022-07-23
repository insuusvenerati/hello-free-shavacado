import { Module } from '@nestjs/common';
import { PlaceholderService } from './placeholder.service';
import { PlaceholderController } from './placeholder.controller';

@Module({
  controllers: [PlaceholderController],
  providers: [PlaceholderService],
})
export class PlaceholderModule {}
