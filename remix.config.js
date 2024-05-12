const { default: flatRoutes } = require("remix-flat-routes");

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/*"],
  serverDependenciesToBundle: ["recipe-data-scraper"],
};
