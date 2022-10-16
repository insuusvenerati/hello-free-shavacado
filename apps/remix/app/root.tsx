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
  useLoaderData,
} from "@remix-run/react";
import algoliasearch from "algoliasearch/lite";
import satelliteCss from "instantsearch.css/themes/algolia-min.css";
import { history } from "instantsearch.js/cjs/lib/routers/index.js";
import { getServerState } from "react-instantsearch-hooks-server";
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch-hooks-web";
import remixImageStyles from "remix-image/remix-image.css";
import { Layout } from "./components/Layout/Layout";

type LoaderData = {
  ENV: Record<string, string>;
  serverState: InstantSearchServerState;
  serverUrl: string;
};

const searchClient = algoliasearch("FVE0OTGLPF", "5263e7543c5a02a750e44a978098b3c0");

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const serverUrl = request.url;
    const serverState = await getServerState(<SearchProvider serverUrl={serverUrl} />);
    return { serverState, serverUrl };
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
  ];
};

createEmotionCache({ key: "mantine" });

function App() {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>(preferredColorScheme);
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const { serverState, serverUrl } = useLoaderData<LoaderData>();

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
