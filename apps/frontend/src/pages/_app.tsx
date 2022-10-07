/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { HeadMeta } from "components/HeadMeta";
import { Layout } from "components/Layout/Layout";
import { RouterTransition } from "components/RouterTransition";
import "instantsearch.css/themes/algolia-min.css";
import { RecipeJsonLdProps } from "next-seo";
import { AppProps as NextAppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Item } from "../types/recipes";

const CLERK_FRONTEND_KEY = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

type AppProps<P = unknown> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

type CustomPageProps = {
  dehydratedState: DehydratedState;
  openGraphData: Array<Record<string, any>>;
  jsonLdData: RecipeJsonLdProps;
  recipe: Item;
};

const publicPages = ["/", "/privacy", "/recipe/[id]"];

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: 1000 * 60 * 60,
//       refetchOnMount: false,
//       notifyOnChangeProps: ["data", "error"],
//     },
//   },
// })

const App = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
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
  const { openGraphData = [] } = pageProps;
  const { pathname } = useRouter();
  const isPublicPage = publicPages.includes(pathname);

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

      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <RouterTransition />
            <ClerkProvider frontendApi={CLERK_FRONTEND_KEY} {...pageProps}>
              <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                  <ReactQueryDevtools initialIsOpen={false} />
                  <Layout>
                    {isPublicPage ? (
                      <Component {...pageProps} />
                    ) : (
                      <>
                        <SignedIn>
                          <Component {...pageProps} />
                        </SignedIn>
                        <SignedOut>
                          <RedirectToSignIn />
                        </SignedOut>
                      </>
                    )}
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
