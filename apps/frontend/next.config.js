const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const onVercel = process.env.VERCEL === 1;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["pages", "components", "hooks"],
  },
  experimental: {
    outputStandalone: !onVercel,
  },
  sentry: {
    disableServerWebpackPlugin: process.env.NODE_ENV === "development",
    disableClientWebpackPlugin: process.env.NODE_ENV === "development",
  },
  sentryWebpackPluginOptions: {
    silent: true,
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    // register: true,
    // scope: '/app',
    // sw: 'service-worker.js',
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __SENTRY_DEBUG__: false,
      }),
    );
    return config;
  },
  images: {
    domains: ["img.hellofresh.com", "imagesvc.meredithcorp.io"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withSentryConfig(withBundleAnalyzer(withPWA(nextConfig)));
