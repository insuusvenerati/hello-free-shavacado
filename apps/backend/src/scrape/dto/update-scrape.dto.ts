import { PartialType } from "@nestjs/mapped-types";
import { CreateScrapeDto } from "./create-scrape.dto";

export class UpdateScrapeDto extends PartialType(CreateScrapeDto) {}
