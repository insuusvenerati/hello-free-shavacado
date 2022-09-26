import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import recipeDataScraper from "recipe-data-scraper";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ScrapeService {
  constructor(private prisma: PrismaService) {}

  async create({ url, user }: { url: string; user: string }) {
    try {
      const recipe = await recipeDataScraper(url);

      return await this.prisma.importedRecipe.create({
        data: { ...recipe, recipeYield: recipe.recipeYield.toString(), userId: user },
      });
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException("Unable to add", HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return await this.prisma.importedRecipe.findMany();
  }

  async findAllByUser(user: string) {
    if (!user) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return await this.prisma.importedRecipe.findMany({
      where: { userId: user },
    });
  }

  async findOne(id: string) {
    return await this.prisma.importedRecipe.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByUser(id: string, user: string) {
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
