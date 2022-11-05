import type {
  ErrorBoundaryComponent,
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
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
import { renderToString } from "react-dom/server";

import { getServerState } from "react-instantsearch-hooks-server";
import {
  InstantSearch,
  InstantSearchSSRProvider,
} from "react-instantsearch-hooks-web";
import { Layout } from "./components/Layout";
import { searchClient } from "./models/search";
import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import styles from "@algolia/autocomplete-theme-classic/dist/theme.css";

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

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: styles },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Hello Free Shavacado",
  viewport: "width=device-width,initial-scale=1",
  description: "Delicious!",
});

export async function loader({ request }: LoaderArgs) {
  const serverUrl = request.url;
  const serverState = await getServerState(
    <SearchProvider serverUrl={serverUrl} />,
    {
      renderToString,
    }
  );

  return json({
    user: await getUser(request),
    serverState,
    serverUrl,
  });
}

function SearchProvider({
  serverState,
  serverUrl,
  children,
}: {
  serverState?: any;
  serverUrl: string;
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

export default function App() {
  const { serverState, serverUrl } = useLoaderData<typeof loader>();
  return (
    <html className="h-screen" lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link
          href="/android-chrome-192x192.png"
          rel="apple-touch-icon"
          sizes="192x192"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <meta
          property="og:url"
          content="https://hello-free-shavacado-new.fly.dev/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="logo.jpg" />
        <meta property="og:title" content="Hello Free Shavacado" />
        <meta property="og:description" content="Delicious!" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="hello-free-shavacado-new.fly.dev"
        />
        <meta
          property="twitter:url"
          content="https://hello-free-shavacado-new.fly.dev/"
        />
        <meta name="twitter:title" content="Hello Free Shavacado" />
        <meta name="twitter:description" content="Delicious!" />
        <meta name="twitter:image" content="logo.jpg"></meta>
        <link href="/site.webmanifest" rel="manifest" />
        <link href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
        <SplashScreens />
        <Meta />
        <Links />
      </head>
      <body data-theme="halloween">
        <SearchProvider serverState={serverState} serverUrl={serverUrl}>
          <Layout>
            <Outlet />
          </Layout>
        </SearchProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        {/* add the UI you want your users to see */}
        <Scripts />
      </body>
    </html>
  );
};
