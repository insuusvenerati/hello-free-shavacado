const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
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
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ["img.hellofresh.com"],
  },
  reactStrictMode: true,
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = withPWA(withSentryConfig(nextConfig));
