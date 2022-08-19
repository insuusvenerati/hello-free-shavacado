const withPlugins = require("next-compose-plugins");
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require("next/constants");
const withPWA = require("next-pwa");
const { withAxiom } = require("next-axiom");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const onVercel = process.env.VERCEL === "1";

const pwaConfig = {
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["pages", "components", "hooks"],
  },
  output: !onVercel ? "standalone" : null,
  experimental: {
    runtime: "experimental-edge",
  },
  images: {
    domains: ["img.hellofresh.com", "imagesvc.meredithcorp.io"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

// module.exports = withBundleAnalyzer(withAxiom(withPWA(nextConfig)));
module.exports = withPlugins(
  [[withPWA, { pwaConfig }, [PHASE_PRODUCTION_BUILD]], withAxiom, withBundleAnalyzer],
  nextConfig,
);
