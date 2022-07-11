// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");
const { withAxiom } = require("next-axiom");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const onVercel = process.env.VERCEL === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ["pages", "components", "hooks"],
  },
  output: !onVercel ? "standalone" : null,
  experimental: {
    runtime: "experimental-edge",
  },
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    // register: true,
    // scope: '/app',
    // sw: 'service-worker.js',
  },
  images: {
    domains: ["img.hellofresh.com", "imagesvc.meredithcorp.io"],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withBundleAnalyzerwithAxiom(withPWA(nextConfig));
