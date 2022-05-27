// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import { Router } from "@layer0/core/router";
import { nextRoutes } from "@layer0/next";

export default new Router()
  .get("/service-worker.js", ({ cache, serveStatic }) => {
    cache({
      edge: {
        maxAgeSeconds: 60 * 60 * 24 * 365,
      },
      browser: {
        maxAgeSeconds: 0,
      },
    });
    serveStatic(".next/static/service-worker.js");
  })
  .get("/_next/data/:version/recipe/:recipe.json", ({ cache }) => {
    cache({
      edge: { maxAgeSeconds: 60 * 60 * 24, staleWhileRevalidateSeconds: 60 * 60 * 24 * 365 },
      browser: { maxAgeSeconds: 0, serviceWorkerSeconds: 60 * 60 * 24 },
    });
  })
  .prerender([{ path: "/" }])
  .use(nextRoutes); // automatically adds routes for all files under /pages
