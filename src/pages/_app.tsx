import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SEO from "../../next-seo.config";
import { useCallback, useState } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { NotificationsProvider } from "@mantine/notifications";

const queryClient = new QueryClient();
const CLERK_FRONTEND_KEY = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

const App = (props: AppProps) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");

  const toggleColorScheme = useCallback(
    (value?: ColorScheme) => {
      setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
    },
    [colorScheme],
  );

  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
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
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
        <title>Hello Free Shavacado</title>
        <meta
          content="Search for Hello Fresh recipes by ingredient"
          name="description"
        />
      </Head>
      <Script
        async
        data-website-id="679de944-0e27-4e1e-aa33-efc4feddd5bb"
        defer
        src="https://analytics.stiforr.tech/umami.js"
      />
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            <DefaultSeo {...SEO} />
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools initialIsOpen={false} />
              <ClerkProvider frontendApi={CLERK_FRONTEND_KEY} {...pageProps}>
                <Component {...pageProps} />
              </ClerkProvider>
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
