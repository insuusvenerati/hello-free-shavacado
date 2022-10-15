import type { LoaderFunction } from "@remix-run/node";
import type { LoaderConfig } from "remix-image/server";
import { DiskCache } from "remix-image/server";
import { imageLoader, MemoryCache } from "remix-image/server";
import { isVercel } from "~/util/isVercel";

const config: LoaderConfig = {
  selfUrl: process.env.VERCEL_URL || "http://localhost:3000",
  cache: isVercel ? new MemoryCache() : new DiskCache(),
  whitelistedDomains: ["img.hellofresh.com"],
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader({ ...config }, request);
};
