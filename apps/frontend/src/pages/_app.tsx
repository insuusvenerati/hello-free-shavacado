/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { ClerkProvider } from "@clerk/nextjs";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { DefaultSeo } from "next-seo";
import { AppProps as NextAppProps } from "next/app";
import NProgress from "nprogress";
import Head from "next/head";
import Router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SEO from "../../next-seo.config";
import { Layout } from "../components/Layout";
import "nprogress/nprogress.css";

const CLERK_FRONTEND_KEY = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

type AppProps<P = unknown> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

type CustomPageProps = {
  dehydratedState: DehydratedState;
};

const App = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60,
            refetchOnMount: false,
            notifyOnChangeProps: ["data", "error"],
            retry: 3,
          },
        },
      }),
  );
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = useCallback(
    () => setColorScheme((current) => (current === "dark" ? "light" : "dark")),
    [setColorScheme],
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    Router.events.on("routeChangeStart", NProgress.start);
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link href="/android-chrome-192x192.png" rel="apple-touch-icon" sizes="192x192" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
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
      </Head>
      <DefaultSeo {...SEO} />
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <ClerkProvider frontendApi={CLERK_FRONTEND_KEY} {...pageProps}>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Hydrate state={pageProps.dehydratedState}>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </Hydrate>
              </QueryClientProvider>
            </ClerkProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
export { reportWebVitals } from "next-axiom";
