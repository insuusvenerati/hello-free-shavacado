const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    ignoreBuildErrors: true,
  },
};

module.exports = withPWA(withSentryConfig(nextConfig));
