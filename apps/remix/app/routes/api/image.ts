import type { LoaderFunction } from "@remix-run/node";
import type { LoaderConfig } from "remix-image/server";
import { DiskCache, imageLoader } from "remix-image/server";

const config: LoaderConfig = {
  selfUrl: process.env.VERCEL_URL || "http://localhost:3000",
  cache: new DiskCache(),
  whitelistedDomains: ["img.hellofresh.com"],
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader({ ...config }, request);
};
