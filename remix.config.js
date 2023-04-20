/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: ["recipe-data-scraper"],
  future: {
    unstable_dev: false,
    unstable_cssModules: false,
    v2_routeConvention: true,
    v2_meta: false,
    v2_errorBoundary: false,
    unstable_postcss: false,
    unstable_tailwind: true,
  },
};
