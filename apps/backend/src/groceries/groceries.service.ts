import { Injectable, Logger } from "@nestjs/common";
import { InjectSentry, SentryService } from "@ntegral/nestjs-sentry";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class GroceriesService {
  private readonly logger = new Logger(GroceriesService.name);

  constructor(
    private prisma: PrismaService,
    @InjectSentry() private readonly sentryClient: SentryService,
  ) {}

  async create(createGroceryDto: Prisma.GroceryCreateInput) {
    return await this.prisma.grocery.create({
      data: createGroceryDto,
    });
  }

  async findAll(params: {
    user: string;
    take: number;
    skip?: number;
    orderBy?: Prisma.GroceryOrderByWithRelationAndSearchRelevanceInput;
  }) {
    const { user, take, skip, orderBy } = params;
    this.logger.debug(orderBy);

    if (isNaN(skip)) {
      return await this.prisma.grocery.findMany({
        where: { userId: user },
        take,
        orderBy,
      });
    }

    return await this.prisma.grocery.findMany({
      where: { userId: user },
      skip,
      take,
    });
  }

  async count(user: string) {
    return await this.prisma.grocery.groupBy({
      by: ["ingredient"],
      _sum: {
        amount: true,
      },
      where: { userId: user },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} grocery`;
  }

  remove(id: number) {
    return `This action removes a #${id} grocery`;
  }
}
