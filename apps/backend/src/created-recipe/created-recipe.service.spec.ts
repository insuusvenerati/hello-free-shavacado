import { Test, TestingModule } from "@nestjs/testing";
import { CreatedRecipeService } from "./created-recipe.service";

describe("CreatedRecipeService", () => {
  let service: CreatedRecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreatedRecipeService],
    }).compile();

    service = module.get<CreatedRecipeService>(CreatedRecipeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
