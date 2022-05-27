// This file was automatically added by layer0 deploy.
// You should commit this file to source control.
import { Router } from "@layer0/core/router";
import { nextRoutes } from "@layer0/next";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const buildIdPath = join(process.cwd(), ".next", "BUILD_ID");

function getPrerenderRequests() {
  const prerenderRequests = [{ path: "/" }, { path: "/privacy" }, { path: "/recipe/:recipe" }];

  if (existsSync(buildIdPath)) {
    // Derive the API requests from the HTML page URLs
    const buildId = readFileSync(buildIdPath, "utf8");
    const apiPaths = prerenderRequests.map((path) => ({ path: `/data/${buildId}${path}.json` }));
    prerenderRequests.push(...apiPaths);
  }

  return prerenderRequests;
}

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
    });
  })
  .prerender(getPrerenderRequests)
  .use(nextRoutes); // automatically adds routes for all files under /pages
