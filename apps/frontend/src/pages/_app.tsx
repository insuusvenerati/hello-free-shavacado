/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { ClerkProvider } from "@clerk/nextjs";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import "instantsearch.css/themes/algolia-min.css";
import { AppProps as NextAppProps } from "next/app";
import Head from "next/head";
import { useCallback, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "components/Layout/Layout";
import { RouterTransition } from "components/RouterTransition";
import { Item } from "../types/recipes";
import { HeadMeta } from "components/HeadMeta";
import { RecipeJsonLdProps } from "next-seo";

const CLERK_FRONTEND_KEY = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

type AppProps<P = unknown> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

type CustomPageProps = {
  // dehydratedState: DehydratedState;
  openGraphData: Array<Record<string, any>>;
  jsonLdData: RecipeJsonLdProps;
  recipe: Item;
};

const App = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
  const { openGraphData = [] } = pageProps;

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

  return (
    <>
      <Head>
        <HeadMeta />
        {openGraphData.map((og, i) => (
          <meta key={i} {...og} />
        ))}
      </Head>
      {/*<RecipeJsonLd {...jsonLdData} />*/}

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <RouterTransition />
            <ClerkProvider frontendApi={CLERK_FRONTEND_KEY} {...pageProps}>
              <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                {/* <Hydrate state={pageProps.dehydratedState}> */}
                {/*<DefaultSeo {...NextSeoConfig} />*/}
                <Layout>
                  <Component {...pageProps} />
                </Layout>
                {/* </Hydrate> */}
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
