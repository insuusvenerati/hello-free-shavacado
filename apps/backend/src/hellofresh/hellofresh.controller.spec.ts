import { Test, TestingModule } from '@nestjs/testing';
import { HellofreshController } from './hellofresh.controller';
import { HellofreshService } from './hellofresh.service';

describe('HellofreshController', () => {
  let controller: HellofreshController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HellofreshController],
      providers: [HellofreshService],
    }).compile();

    controller = module.get<HellofreshController>(HellofreshController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
