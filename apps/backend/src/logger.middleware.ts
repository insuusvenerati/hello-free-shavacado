import type { NestMiddleware } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  protected readonly logger = new Logger(LoggerMiddleware.name);
  private lastLoggedPositiveHealthCheck = process.hrtime();
  private responseTime = process.hrtime();
  private healthCheckLoggingInterval = 10; // seconds

  public getResponseTime(): string {
    const diff = process.hrtime(this.responseTime);
    const ms = diff[0] * 1e3 + diff[1] * 1e-6;
    return ms.toFixed(3);
  }

  public formatMessage(request: Request, response: Response): string {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get(`user-agent`) || ``;
    const { statusCode } = response;
    const contentLength = response.get(`content-length`);

    return `${this.getResponseTime()}ms ${method} ${originalUrl} ${statusCode} ${contentLength} ${userAgent} ${ip}`;
  }

  public shouldLog(request: Request, response: Response): boolean {
    const { originalUrl } = request;
    const { statusCode } = response;
    const isRejected = statusCode >= 400;
    const notHealthCheck = !originalUrl.includes(`/health`);
    const shouldLogHealthCheck =
      originalUrl.includes(`/health`) &&
      this.healthCheckLoggingInterval <
        process.hrtime(this.lastLoggedPositiveHealthCheck)[0];
    if (shouldLogHealthCheck) {
      this.lastLoggedPositiveHealthCheck = process.hrtime();
    }
    return isRejected || notHealthCheck || shouldLogHealthCheck;
  }

  public use(request: Request, response: Response, next: NextFunction): void {
    this.responseTime = process.hrtime();
    response.on(`finish`, () => {
      if (this.shouldLog(request, response)) {
        this.logger.log(this.formatMessage(request, response));
      }
    });

    next();
  }
}
