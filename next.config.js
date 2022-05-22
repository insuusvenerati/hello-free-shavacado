// This file was automatically added by layer0 init.
// You should commit this file to source control.
const { withLayer0, withServiceWorker } = require("@layer0/next/config");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
  experimental: {
    outputStandalone: true,
  },
  outputFileTracing: true,
  images: {
    domains: ["img.hellofresh.com"],
  },
  reactStrictMode: true,
  // pwa: {
  //   dest: "public",
  //   runtimeCaching,
  //   disable: process.env.NODE_ENV === "development",
  // },
  typescript: {
    ignoreBuildErrors: false,
  },
};

const _preLayer0Export = nextConfig;

module.exports = (phase, config) =>
  withLayer0(
    withServiceWorker({
      // Output sourcemaps so that stack traces have original source filenames and line numbers when tailing
      // the logs in the Layer0 developer console.
      layer0SourceMaps: false,

      ..._preLayer0Export,
    }),
  );
