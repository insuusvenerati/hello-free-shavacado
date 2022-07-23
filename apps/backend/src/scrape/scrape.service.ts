import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import recipeDataScraper from "recipe-data-scraper";
import { PrismaService } from "src/prisma.service";

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

  async findAll(user: string) {
    if (!user) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return await this.prisma.importedRecipe.findMany({
      where: { userId: user },
    });
  }

  async findOne(id: string, user: string) {
    if (!user) throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    return await this.prisma.importedRecipe.findUnique({
      where: { id: id },
    });
  }

  update(id: number) {
    return `This action updates a #${id} scrape`;
  }

  async remove(id: string, user: string) {
    if (!user) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return await this.prisma.importedRecipe.delete({
      where: { id: id },
    });
  }
}
