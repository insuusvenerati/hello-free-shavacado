// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require("next-pwa");
const { env } = require("./src/server/env");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const onVercel = process.env.VERCEL === "1";

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function getConfig(config) {
  return config;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
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
  publicRuntimeConfig: {
    NODE_ENV: env.NODE_ENV,
  },
};

module.exports = getConfig(withBundleAnalyzer(withPWA(nextConfig)));
