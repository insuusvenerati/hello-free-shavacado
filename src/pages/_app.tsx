import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { DefaultSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SEO from "../../next-seo.config";

const queryClient = new QueryClient();

const App = (props: AppProps) => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width"
          name="viewport"
        />
      </Head>

      <MantineProvider
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <DefaultSeo {...SEO} />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
};

export default App;
