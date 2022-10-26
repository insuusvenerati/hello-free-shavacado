import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import { renderToString } from "react-dom/server";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useFetchers,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import algoliasearch from "algoliasearch/lite";
import satelliteCss from "instantsearch.css/themes/algolia-min.css";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect, useMemo } from "react";
import { getServerState } from "react-instantsearch-hooks-server";
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch-hooks-web";
import remixImageStyles from "remix-image/remix-image.css";
import { Layout } from "./components/Layout/Layout";
import { db } from "./util/db.server";
import { getThemeSession } from "./util/theme.server";
import { NotificationsProvider } from "@mantine/notifications";

type LoaderData = {
  serverState: InstantSearchServerState;
  serverUrl?: string;
  theme: ColorScheme;
};

const searchClient = algoliasearch("FVE0OTGLPF", "5263e7543c5a02a750e44a978098b3c0");

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { userId } = request.auth;

    const [themeSession, favoriteRecipes, serverState] = await Promise.all([
      getThemeSession(request),
      db.recipe.findMany({
        where: {
          userId,
        },
      }),
      getServerState(<SearchProvider />, { renderToString }),
    ]);

    return { serverState, favoriteRecipes, theme: themeSession.getTheme() };
  });
};

function SearchProvider({
  serverState,
  serverUrl,
  children,
}: {
  serverState?: InstantSearchServerState;
  serverUrl?: string;
  children?: React.ReactNode;
}) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <InstantSearch searchClient={searchClient} indexName="hellofresh">
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
  const fetcher = useFetcher();

  const toggleColorScheme = (value: ColorScheme) => {
    fetcher.submit({ theme: value }, { method: "post", action: "/api/theme" });
  };

  const { serverState, theme } = useLoaderData<LoaderData>();

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
        <ColorSchemeProvider colorScheme={theme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{ colorScheme: theme }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
              <SearchProvider serverState={serverState}>
                <Layout>
                  <Outlet />
                </Layout>
                <ScrollRestoration /> <Scripts /> <LiveReload />
              </SearchProvider>
            </NotificationsProvider>
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
