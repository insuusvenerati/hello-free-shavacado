import { CacheModule, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as redisStore from "cache-manager-ioredis";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HellofreshModule } from "./hellofresh/hellofresh.module";
import { LoggerMiddleware } from "./logger.middleware";
import { PlaceholderModule } from "./placeholder/placeholder.module";
import { RecipeModule } from "./recipe/recipe.module";
import { GroceriesModule } from "./groceries/groceries.module";
import { ScrapeModule } from "./scrape/scrape.module";
import { ScheduleModule } from "@nestjs/schedule";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? ".env" : `.env.${ENV}.local`,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: ENV === "development" ? 30 : 60 * 60,
      store: redisStore,
      host: process.env.REDISHOST,
      port: +process.env.REDISPORT || 6379,
      // family: 6,
      password: process.env.REDISPASSWORD,
    }),
    ScheduleModule.forRoot(),
    HellofreshModule,
    PlaceholderModule,
    RecipeModule,
    GroceriesModule,
    ScrapeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes(`*`);
  }
}
