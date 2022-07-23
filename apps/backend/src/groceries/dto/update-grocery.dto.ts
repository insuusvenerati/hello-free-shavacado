import { PartialType } from "@nestjs/mapped-types";
import { CreateGroceryDto } from "./create-grocery.dto";

export class UpdateGroceryDto extends PartialType(CreateGroceryDto) {}
