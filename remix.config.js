const { default: flatRoutes } = require("remix-flat-routes");

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: ["recipe-data-scraper", "@remix-pwa/sw"],
  tailwind: true,
  serverModuleFormat: "cjs",
  future: {
    v2_dev: true,
    v2_routeConvention: true,
    v2_meta: false,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_normalizeFormMethod: true,
  },
};
