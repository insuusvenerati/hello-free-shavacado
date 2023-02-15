/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: ["recipe-data-scraper"],
  future: {
    unstable_dev: false,
    unstable_cssModules: true,
    unstable_postcss: true,
    unstable_tailwind: true,
  },
};
