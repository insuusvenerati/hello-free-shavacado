import { ClerkApp, ClerkCatchBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { dark } from "@clerk/themes";
import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { StylesPlaceholder } from "@mantine/remix";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
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
import { renderToString } from "react-dom/server";
import { getServerState } from "react-instantsearch-hooks-server";
import type { InstantSearchServerState } from "react-instantsearch-hooks-web";
import { InstantSearch, InstantSearchSSRProvider } from "react-instantsearch-hooks-web";
import remixImageStyles from "remix-image/remix-image.css";
import { Layout } from "./components/Layout/Layout";
import { db } from "./util/db.server";
import { getThemeSession } from "./util/theme.server";

const SplashScreens = () => (
  <>
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/12.9__iPad_Pro_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/10.5__iPad_Air_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/10.2__iPad_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      href="splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      href="splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      href="splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      href="splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/iPhone_11__iPhone_XR_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
      href="splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
      href="splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/12.9__iPad_Pro_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/10.5__iPad_Air_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/10.2__iPad_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      href="splash_screens/iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      href="splash_screens/iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      href="splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      href="splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/iPhone_11__iPhone_XR_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
      href="splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
    />
    <link
      rel="apple-touch-startup-image"
      media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
      href="splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
    />
  </>
);

type LoaderData = {
  serverState: InstantSearchServerState;
  serverUrl?: string;
  theme: ColorScheme | null;
};

const searchClient = algoliasearch("FVE0OTGLPF", "5263e7543c5a02a750e44a978098b3c0");

export const loader = (args: LoaderArgs) => {
  return rootAuthLoader(args, async ({ request }) => {
    const { userId } = request.auth;

    const [themeSession, favoriteRecipes, importedRecipes, serverState] = await Promise.all([
      getThemeSession(request),
      db.recipe.findMany({
        where: {
          userId,
        },
      }),
      db.importedRecipe.findMany({
        where: {
          userId,
        },
      }),
      getServerState(<SearchProvider />, { renderToString }),
    ]);

    return { serverState, favoriteRecipes, importedRecipes, theme: themeSession.getTheme() };
  });
};

function SearchProvider({
  serverState,
  children,
}: {
  serverState?: InstantSearchServerState;
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
  viewport:
    "width=device-width,initial-scale=1,viewport-fit=cover,shrink-to-fit=no,minimum-scale=1",
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
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link href="/android-chrome-192x192.png" rel="apple-touch-icon" sizes="192x192" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
        <SplashScreens />
        <Meta /> <Links /> <StylesPlaceholder />
      </head>
      <body>
        <ColorSchemeProvider colorScheme={theme ?? "light"} toggleColorScheme={toggleColorScheme}>
          <MantineProvider
            theme={{ colorScheme: theme ?? "light" }}
            withGlobalStyles
            withNormalizeCSS
          >
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
export default ClerkApp(App, { appearance: { baseTheme: dark } });
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
