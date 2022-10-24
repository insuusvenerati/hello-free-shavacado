import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from "@mantine/core";
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import { StylesPlaceholder } from "@mantine/remix";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import algoliasearch from "algoliasearch/lite";
import satelliteCss from "instantsearch.css/themes/algolia-min.css";
import { history } from "instantsearch.js/cjs/lib/routers/index.js";
import { getServerState } from "react-instantsearch-hooks-server";
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch-hooks-web";
import remixImageStyles from "remix-image/remix-image.css";
import { Layout } from "./components/Layout/Layout";
import { db } from "./util/db.server";
import { useEffect, useMemo } from "react";

type LoaderData = {
  ENV: Record<string, string>;
  serverState: InstantSearchServerState;
  serverUrl: string;
};

const searchClient = algoliasearch("FVE0OTGLPF", "5263e7543c5a02a750e44a978098b3c0");

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { userId } = request.auth;
    const serverUrl = request.url;

    const favoriteRecipes = await db.recipe.findMany({
      where: {
        user_id: userId,
      },
    });
    const serverState = await getServerState(<SearchProvider serverUrl={serverUrl} />);
    return { serverState, serverUrl, favoriteRecipes };
  });
};

function SearchProvider({
  serverState,
  serverUrl,
  children,
}: {
  serverState?: InstantSearchServerState;
  serverUrl: string;
  children?: React.ReactNode;
}) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch
        searchClient={searchClient}
        indexName="hellofresh"
        routing={{
          router: history({
            getLocation() {
              if (typeof window === "undefined") {
                return new URL(serverUrl);
              }
              return window.location;
            },
          }),
        }}
      >
        {children}
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Hello Free Shavacado",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: satelliteCss },
    { rel: "stylesheet", href: remixImageStyles },
    { rel: "stylesheet", href: nProgressStyles },
  ];
};

createEmotionCache({ key: "mantine" });

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { serverState, serverUrl } = useLoaderData<LoaderData>();

  let transition = useTransition();

  let fetchers = useFetchers();

  let state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [transition.state, ...fetchers.map((fetcher) => fetcher.state)];
      if (states.every((state) => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers],
  );

  useEffect(() => {
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [transition.state]);

  return (
    <html lang="en">
      <head>
        <Meta /> <Links /> <StylesPlaceholder />
      </head>
      <body>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
            <SearchProvider serverUrl={serverUrl} serverState={serverState}>
              <Layout>
                <Outlet />
              </Layout>
              <ScrollRestoration /> <Scripts /> <LiveReload />
            </SearchProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </body>
    </html>
  );
}
export default ClerkApp(App);
export const CatchBoundary = ClerkCatchBoundary();
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title> <Meta /> <Links />
      </head>
      <body>
        <h3>Oops</h3> <pre>{JSON.stringify(error.message, null, 2)}</pre>
        <Scripts />
      </body>
    </html>
  );
}
