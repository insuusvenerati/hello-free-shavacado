// @ts-check

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  dsn: SENTRY_DSN || "https://f5269bd6923c4d0888e2bacd659677fb@o122225.ingest.sentry.io/6345319",
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0.25,
  environment: process.env.NODE_ENV,
  enabled: process.env.NODE_ENV === "production",
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
