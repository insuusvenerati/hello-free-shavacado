import { CacheModule, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { SentryInterceptor, SentryModule } from "@ntegral/nestjs-sentry";
import * as Sentry from "@sentry/node";
import * as redisStore from "cache-manager-ioredis";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CreatedRecipeModule } from "./created-recipe/created-recipe.module";
import { GroceriesModule } from "./groceries/groceries.module";
import { HellofreshModule } from "./hellofresh/hellofresh.module";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { TraceMiddleware } from "./middleware/trace.middleware";
import { PlaceholderModule } from "./placeholder/placeholder.module";
import { PrismaService } from "./prisma.service";
import { RecipeModule } from "./recipe/recipe.module";
import { ScrapeModule } from "./scrape/scrape.module";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    SentryModule.forRoot({
      dsn: process.env.SENTRY_DSN,
      debug: true,
      environment: ENV,
      integrations: [new Sentry.Integrations.Http({ tracing: true })],
      tracesSampleRate: 1.0,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: ENV === "production" ? 60 * 60 * 24 : 60,
      store: redisStore,
      host: process.env.REDISHOST || "localhost",
      port: +process.env.REDISPORT || 6379,
      // family: 6,
      password: process.env.REDISPASSWORD,
    }),
    HellofreshModule,
    PlaceholderModule,
    RecipeModule,
    GroceriesModule,
    ScrapeModule,
    CreatedRecipeModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useValue: new SentryInterceptor() },
    UsersService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer.apply(TraceMiddleware).forRoutes("*");
  }
}
