import { createRouter } from "../createRouter";
import { hellofreshRouter } from "./hellofresh";

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  /**
   * Optionally do custom error (type safe!) formatting
   * @link https://trpc.io/docs/error-formatting
   */
  // .formatError(({ shape, error }) => { })
  /**
   * Add a health check endpoint to be called with `/api/trpc/healthz`
   */
  .query("healthz", {
    // eslint-disable-next-line @typescript-eslint/require-await
    async resolve() {
      return "OK!";
    },
  })
  .merge("hellofresh.", hellofreshRouter);

export type AppRouter = typeof appRouter;
