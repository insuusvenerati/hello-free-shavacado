import { Test, TestingModule } from "@nestjs/testing";
import { GroceriesService } from "./groceries.service";

describe("GroceriesService", () => {
  let service: GroceriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroceriesService],
    }).compile();

    service = module.get<GroceriesService>(GroceriesService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
