const { withSentryConfig } = require("@sentry/nextjs");
const withPWA = require("next-pwa");
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
  target: "server",
  images: {
    domains: ["img.hellofresh.com"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = withPWA(withBundleAnalyzer(withSentryConfig(nextConfig)));
