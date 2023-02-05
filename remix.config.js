/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  ignoredRouteFiles: ["**/.*", "**/*.css", "**/*.test.{js,jsx,ts,tsx}"],
  serverDependenciesToBundle: [
    "instantsearch.js/es/connectors/rating-menu/connectRatingMenu",
    "instantsearch.js/es/connectors/relevant-sort/connectRelevantSort",
    "recipe-data-scraper",
  ],
  future: {
    unstable_dev: false,
  },
};
