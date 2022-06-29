/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  req: NextApiRequest;
  res: NextApiResponse;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function createContextInner(_opts: CreateContextOptions) {
  const getCookieFromHeaders = () => {
    if (_opts?.req.cookies.token) {
      return _opts.req.cookies.token;
    }
    return null;
  };
  const token = getCookieFromHeaders();
  return { token };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function createContext(opts: trpcNext.CreateNextContextOptions): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching
  // const getCookieFromHeaders = () => {
  //   if (opts?.req.cookies.token) {
  //     return opts.req.cookies.token;
  //   }
  //   return null;
  // };

  // const token = getCookieFromHeaders();

  return await createContextInner({ req: opts.req, res: opts.res });
}
