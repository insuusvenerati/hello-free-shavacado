import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

/**
 * Clerk authentication middleware
 */
export class ClerkMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Retrieve the particular session ID from a
    // query string parameter
    const sessionId = req.headers.authorization;

    console.dir(sessionId);
    next();
  }
}
