import { Test, TestingModule } from "@nestjs/testing";
import { GroceriesController } from "./groceries.controller";
import { GroceriesService } from "./groceries.service";

describe("GroceriesController", () => {
  let controller: GroceriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceriesController],
      providers: [GroceriesService],
    }).compile();

    controller = module.get<GroceriesController>(GroceriesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
