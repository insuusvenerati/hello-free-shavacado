import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import recipeDataScraper from "recipe-data-scraper";
import { PrismaService } from "src/prisma.service";
import { UpdateScrapeDto } from "./dto/update-scrape.dto";

@Injectable()
export class ScrapeService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ url, user }: { url: string; user: string }) {
    try {
      const recipe = await recipeDataScraper(url);

      return await this.prisma.importedRecipe.create({
        data: { ...recipe, userId: user },
      });
    } catch (error) {
      throw new HttpException("Unable to add", HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all scrape`;
  }

  async findOne(id: string) {
    return await this.prisma.importedRecipe.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateScrapeDto: UpdateScrapeDto) {
    return `This action updates a #${id} scrape`;
  }

  remove(id: number) {
    return `This action removes a #${id} scrape`;
  }
}
