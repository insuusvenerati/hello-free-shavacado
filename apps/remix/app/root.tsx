import { ClerkCatchBoundary } from "@clerk/remix";
import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from "@mantine/core";
import { StylesPlaceholder } from "@mantine/remix";
import type { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
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
import { history } from "instantsearch.js/cjs/lib/routers/index.js";
import { useState } from "react";
import { getServerState } from "react-instantsearch-hooks-server";
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch-hooks-web";
import { Layout } from "./components/Layout/Layout";
import satelliteCss from "instantsearch.css/themes/algolia-min.css";

type LoaderData = {
  ENV: Record<string, string>;
  serverState: InstantSearchServerState;
  serverUrl: string;
};

const searchClient = algoliasearch("FVE0OTGLPF", "5263e7543c5a02a750e44a978098b3c0");

export const loader: LoaderFunction = async ({ request }) => {
  const serverUrl = request.url;
  const serverState = await getServerState(<SearchProvider serverUrl={serverUrl} />);

  return json({
    serverState,
    serverUrl,
  });
};

// export const loader: LoaderFunction = (args) => {
//   return rootAuthLoader(args, ({ request }) => {
//     const { sessionId, userId, getToken } = request.auth;
//     // fetch data
//     return json({
//       ENV: {
//         ALGOLIA_APP: process.env.ALGOLIA_APP,
//         ALGOLIA_KEY: process.env.ALGOLIA_KEY,
//       },
//     });
//   });
// };

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
  return [{ rel: "stylesheet", href: satelliteCss }];
};

createEmotionCache({ key: "mantine" });

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const { ENV, serverState, serverUrl } = useLoaderData<LoaderData>();

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
        <SearchProvider serverUrl={serverUrl} serverState={serverState}>
          <html lang="en">
            <head>
              <StylesPlaceholder />
              <Meta />
              <Links />
            </head>
            <body>
              <Layout>
                <Outlet />
              </Layout>
              <ScrollRestoration />
              <script
                dangerouslySetInnerHTML={{
                  __html: `window.ENV = ${JSON.stringify(ENV)}`,
                }}
              />
              <Scripts />
              <LiveReload />
            </body>
          </html>
        </SearchProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

// export default ClerkApp(App);
export default App;

export const CatchBoundary = ClerkCatchBoundary();
