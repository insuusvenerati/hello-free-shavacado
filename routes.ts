// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import { Router } from "@layer0/core/router";
import { nextRoutes } from "@layer0/next";

export default new Router()
  .get("/_next/image", ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24, // One Day
      },
    });
  })
  .get("/", ({ cache }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
      },
    });
  })
  .get("/hellofresh", ({ cache, proxy }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60,
        staleWhileRevalidateSeconds: 60 * 60 * 24,
      },
    });
    proxy("origin");
  })
  .match("/service-worker.js", ({ serviceWorker }) => {
    return serviceWorker(".next/static/service-worker.js");
  })
  .use(nextRoutes); // automatically adds routes for all files under /pages
