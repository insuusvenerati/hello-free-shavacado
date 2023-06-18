import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { startTransition, StrictMode, useEffect } from "react";
import { hydrateRoot } from "react-dom/client";
import * as Sentry from "@sentry/remix";

Sentry.init({
  dsn: "https://817080981d014d4aabd1f04063b463ce:8c77d5fccdc24c17a975bad93c7fd766@o122225.ingest.sentry.io/4504671422251008",
  integrations: [
    new Sentry.BrowserTracing({
      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
      routingInstrumentation: Sentry.remixRouterInstrumentation(useEffect, useLocation, useMatches),
    }),
    // Replay is only available in the client
    new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.2,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  enabled: process.env.NODE_ENV === "production",
});

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
};

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}

if (process.env.NODE_ENV === "production") {
  if ("serviceWorker" in navigator) {
    // Use the window load event to keep the page load performant
    async function loadSW() {
      console.log("loaded");

      return navigator.serviceWorker
        .register("/entry.worker.js")
        .then(() => navigator.serviceWorker.ready)
        .then(() => {
          if (navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
              type: "SYNC_REMIX_MANIFEST",
              manifest: window.__remixManifest,
            });
          } else {
            navigator.serviceWorker.addEventListener("controllerchange", () => {
              navigator.serviceWorker.controller?.postMessage({
                type: "SYNC_REMIX_MANIFEST",
                manifest: window.__remixManifest,
              });
            });
          }
        })
        .catch((error) => {
          console.error("Service worker registration failed", error);
        });
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
      loadSW();
    } else {
      window.addEventListener("load", loadSW);
    }
  }
}
