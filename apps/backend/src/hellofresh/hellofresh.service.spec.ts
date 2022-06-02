import { Test, TestingModule } from '@nestjs/testing';
import { HellofreshService } from './hellofresh.service';

describe('HellofreshService', () => {
  let service: HellofreshService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HellofreshService],
    }).compile();

    service = module.get<HellofreshService>(HellofreshService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
