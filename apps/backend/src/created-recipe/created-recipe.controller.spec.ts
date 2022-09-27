import { Test, TestingModule } from "@nestjs/testing";
import { CreatedRecipeController } from "./created-recipe.controller";
import { CreatedRecipeService } from "./created-recipe.service";

describe("CreatedRecipeController", () => {
  let controller: CreatedRecipeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreatedRecipeController],
      providers: [CreatedRecipeService],
    }).compile();

    controller = module.get<CreatedRecipeController>(CreatedRecipeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
