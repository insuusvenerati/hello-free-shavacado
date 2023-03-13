/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: ["recipe-data-scraper"],
  future: {
    unstable_dev: true,
    unstable_cssModules: false,
    v2_routeConvention: true,
    v2_meta: true,
    v2_errorBoundary: false,
    unstable_postcss: true,
    unstable_tailwind: true,
  },
};
