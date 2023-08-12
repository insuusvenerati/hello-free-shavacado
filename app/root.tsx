import { useSWEffect } from "@remix-pwa/sw";
import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { captureRemixErrorBoundaryError, withSentry } from "@sentry/remix";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import toastStyles from "react-toastify/dist/ReactToastify.css";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { useGlobalTransitionStates } from "remix-utils";
import { Layout } from "./components/Layout";
import { getUserColorScheme } from "./db/getUserColorScheme.server";
import { getUserFavorites } from "./models/recipe.server";
import { getThemeSession } from "./models/theme.server";
import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";

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
    { rel: "stylesheet", href: toastStyles },
    { rel: "stylesheet", href: nProgressStyles },
  ];
};

export const meta: MetaFunction<typeof loader> = () => {
  return {
    charset: "utf-8",
    title: "Hello Free Shavacado",
    viewport: "width=device-width,initial-scale=1",
    description: "Delicious!",
    "og:url": "https://hf-staging.stiforr.com/",
    "og:type": "website",
    "og:image": "/logo.jpg",
    "og:title": "Hello Free Shavacado",
    "og:description": "Delicious!",
    "twitter:card": "summary_large_image",
    "twitter:domain": "hf-staging.stiforr.com",
    "twitter:url": "https://hf-staging.stiforr.com/",
    "twitter:title": "Hello Free Shavacado",
    "twitter:description": "Delicious!",
    "twitter:image": "/logo.jpg",
  };
};

export async function loader({ request }: LoaderArgs) {
  try {
    const user = await getUser(request);

    const [themeSession, colorScheme, favorites] = await Promise.all([
      getThemeSession(request),
      getUserColorScheme(user),
      getUserFavorites(user?.id),
    ]);

    return typedjson({
      favorites,
      user,
      colorScheme: colorScheme ?? themeSession.getTheme(),
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(`Unknown error: ${JSON.stringify(error)}`);
  }
}
function App() {
  const { colorScheme } = useTypedLoaderData<typeof loader>();
  const [state] = useGlobalTransitionStates();

  useSWEffect();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    if (state === "loading") NProgress.start();
    if (state === "idle") NProgress.done();
  }, [state]);

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link href="/icons/android-chrome-192x192.png" rel="apple-touch-icon" sizes="192x192" />
        <link href="/icons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/icons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link rel="manifest" href="/resource/manifest.webmanifest" />
        <link href="/icons/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
        <SplashScreens />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen" data-theme={colorScheme ?? "dark"}>
        <Layout>
          <Outlet />
        </Layout>
        <ToastContainer theme={colorScheme === "dark" ? "dark" : "light"} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default withSentry(App);

export function ErrorBoundary() {
  const error = useRouteError();

  captureRemixErrorBoundaryError(error);

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  // Don't forget to typecheck with your own logic.
  // Any value can be thrown, not just errors!
  let errorMessage;
  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link href="/android-chrome-192x192.png" rel="apple-touch-icon" sizes="192x192" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link rel="manifest" href="/resource/manifest.webmanifest" />
        <link href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
        <SplashScreens />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <Layout>
          <pre> {errorMessage} </pre>
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
