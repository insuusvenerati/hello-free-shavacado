import { Test, TestingModule } from '@nestjs/testing';
import { PlaceholderController } from './placeholder.controller';
import { PlaceholderService } from './placeholder.service';

describe('PlaceholderController', () => {
  let controller: PlaceholderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceholderController],
      providers: [PlaceholderService],
    }).compile();

    controller = module.get<PlaceholderController>(PlaceholderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
