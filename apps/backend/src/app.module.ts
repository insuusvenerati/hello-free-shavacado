import { CacheModule, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as redisStore from "cache-manager-ioredis";
import { AppService } from "./app.service";
import { HellofreshModule } from "./hellofresh/hellofresh.module";
import { LoggerMiddleware } from "./middleware/logger.middleware";
import { PlaceholderModule } from "./placeholder/placeholder.module";
import { RecipeModule } from "./recipe/recipe.module";
import { GroceriesModule } from "./groceries/groceries.module";
import { ScrapeModule } from "./scrape/scrape.module";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { SentryInterceptor, SentryModule } from "@ntegral/nestjs-sentry";
import * as Sentry from "@sentry/node";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { TraceMiddleware } from "./middleware/trace.middleware";

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
      envFilePath: !ENV ? ".env" : `.env.${ENV}.local`,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: ENV === "production" ? 60 : 1,
      store: redisStore,
      host: process.env.REDISHOST,
      port: +process.env.REDISPORT || 6379,
      // family: 6,
      password: process.env.REDISPASSWORD,
    }),
    HellofreshModule,
    PlaceholderModule,
    RecipeModule,
    GroceriesModule,
    ScrapeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_INTERCEPTOR, useValue: new SentryInterceptor() }],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes("*");
    consumer.apply(TraceMiddleware).forRoutes("*");
  }
}
