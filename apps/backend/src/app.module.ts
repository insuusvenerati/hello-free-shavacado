import {
  CacheInterceptor,
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HellofreshModule } from './hellofresh/hellofresh.module';
import { LoggerMiddleware } from './logger.middleware';
import { PlaceholderModule } from './placeholder/placeholder.module';
import * as redisStore from 'cache-manager-ioredis';

const oneDay = 60 * 60 * 24;
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    CacheModule.register({
      ttl: 1,
      store: redisStore,
      host: process.env.REDISHOST,
      port: +process.env.REDISPORT,
      // family: 6,
      password: process.env.REDISPASSWORD,
    }),
    HellofreshModule,
    PlaceholderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
