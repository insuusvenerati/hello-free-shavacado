import { ClerkProvider } from "@clerk/nextjs";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { DefaultSeo } from "next-seo";
import { AppProps as NextAppProps } from "next/app";
import Head from "next/head";
import { useCallback, useState } from "react";
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SEO from "../../next-seo.config";
import { Layout } from "../components/Layout";

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

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link href="/android-chrome-192x192.png" rel="apple-touch-icon" sizes="192x192" />
        <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link href="/site.webmanifest" rel="manifest" />
        <link color="#5bbad5" href="/safari-pinned-tab.svg" rel="mask-icon" />
        <meta content="#da532c" name="msapplication-TileColor" />
        <meta content="#f69435" name="theme-color"></meta>
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
