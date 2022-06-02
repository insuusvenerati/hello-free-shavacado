// This file configures the initialization of Sentry on the browser.
// The config you add here will be used whenever a page is visited.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { BrowserTracing } from "@sentry/tracing";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

Sentry.init({
  environment: process.env.NODE_ENV,
  dsn:
    SENTRY_DSN ||
    "https://f5269bd6923c4d0888e2bacd659677fb@o122225.ingest.sentry.io/6345319",
  beforeSend(event, hint) {
    if (event.exception && process.env.NODE_ENV !== "development") {
      Sentry.showReportDialog({
        eventId: event.event_id,
        user: { email: "noemail@example.com" },
      });
    }
    return event;
  },
  integrations: [
    new BrowserTracing({
      tracingOrigins: ["localhost", "hf.stiforr.tech", /^\//],
    }),
  ],
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.2,
});
