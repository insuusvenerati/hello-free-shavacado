import { ClerkProvider } from "@clerk/nextjs";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import * as Sentry from "@sentry/nextjs";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SEO from "../../next-seo.config";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "./api/trpc/[trpc]";

const CLERK_FRONTEND_KEY = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const App = (props: AppProps) => {
  // eslint-disable-next-line react/hook-use-state
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } }),
  );
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      LogRocket.init("stiforr/hello-free-shavacado");
      setupLogRocketReact(LogRocket);
      LogRocket.getSessionURL((sessionURL) => {
        Sentry.configureScope((scope) => {
          scope.setExtra("sessionURL", sessionURL);
        });
      });
    }
  }, []);

  const toggleColorScheme = useCallback(
    () => setColorScheme((current) => (current === "dark" ? "light" : "dark")),
    [setColorScheme],
  );

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
        <link href="/android-chrome-192x192.png" rel="apple-touch-icon" sizes="192x192" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
        <title>Hello Free Shavacado</title>
        <meta content="Search for Hello Fresh recipes by ingredient" name="description" />
      </Head>
      <DefaultSeo {...SEO} />
      <Script
        async
        data-website-id="679de944-0e27-4e1e-aa33-efc4feddd5bb"
        defer
        src="https://analytics.stiforr.tech/umami.js"
      />
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <ClerkProvider frontendApi={CLERK_FRONTEND_KEY} {...pageProps}>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <Hydrate state={pageProps.dehydratedState}>
                  <Component {...pageProps} />
                </Hydrate>
              </QueryClientProvider>
            </ClerkProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(App);
