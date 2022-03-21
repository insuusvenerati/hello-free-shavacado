const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.hellofresh.com"],
  },
  reactStrictMode: true,
  pwa: {
    dest: "public",
    runtimeCaching,
    disable: process.env.NODE_ENV === "development",
  },
};

module.exports = withPWA(nextConfig);
