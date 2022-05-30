// This file was automatically added by layer0 init.
// You should commit this file to source control.
const { withLayer0, withServiceWorker } = require("@layer0/next/config");
const { withSentryConfig } = require("@sentry/nextjs");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  compiler: {
    removeConsole: true,
  },
  sentry: {
    disableServerWebpackPlugin: process.env.NODE_ENV === "development",
    disableClientWebpackPlugin: process.env.NODE_ENV === "development",
  },
  sentryWebpackPluginOptions: {
    silent: true,
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
      }),
    );
    return config;
  },
  target: "server",
  images: {
    domains: ["img.hellofresh.com"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

const _preLayer0Export = withBundleAnalyzer(withSentryConfig(nextConfig));

module.exports = (phase, config) =>
  withLayer0(
    withServiceWorker({
      // Output sourcemaps so that stack traces have original source filenames and line numbers when tailing
      // the logs in the Layer0 developer console.
      layer0SourceMaps: true,

      ..._preLayer0Export,
    }),
  );
