import { Test, TestingModule } from '@nestjs/testing';
import { PlaceholderService } from './placeholder.service';

describe('PlaceholderService', () => {
  let service: PlaceholderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaceholderService],
    }).compile();

    service = module.get<PlaceholderService>(PlaceholderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
