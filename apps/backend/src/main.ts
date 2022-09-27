import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import * as SentryTracing from "@sentry/tracing";
import * as cookieParser from "cookie-parser";
import { AppModule } from "./app.module";
import { PrismaClientExceptionFilter } from "./prisma-client-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(cookieParser());
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  SentryTracing.addExtensionMethods();
  await app.listen(parseInt(process.env.PORT) || 4000, "0.0.0.0");
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
