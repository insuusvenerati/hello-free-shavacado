import { PassThrough } from "stream";
import type { DataFunctionArgs, EntryContext } from "@remix-run/node";
import { Response } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as Sentry from "@sentry/remix";
import { prisma } from "./db.server";

const ABORT_DELAY = 5000;

Sentry.init({
  dsn: "https://817080981d014d4aabd1f04063b463ce:8c77d5fccdc24c17a975bad93c7fd766@o122225.ingest.sentry.io/4504671422251008",
  tracesSampleRate: 1,
  integrations: [new Sentry.Integrations.Prisma({ client: prisma })],
  environment: process.env.NODE_ENV,
});

export function handleError(error: unknown, { request }: DataFunctionArgs): void {
  if (error instanceof Error) {
    Sentry.captureRemixServerException(error, "remix.server", request);
  } else {
    // Optionally capture non-Error objects
    Sentry.captureException(error);
  }
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  const callbackName = isbot(request.headers.get("user-agent")) ? "onAllReady" : "onShellReady";

  return new Promise((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          const body = new PassThrough();

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            }),
          );

          pipe(body);
        },
        onShellError: (err: unknown) => {
          reject(err);
        },
        onError: (error: unknown) => {
          didError = true;

          console.error(error);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
