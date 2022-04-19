import { createTheme, NextUIProvider } from "@nextui-org/react";
import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "react-query";
import SEO from "../../next-seo.config";

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextUIProvider>
        <DefaultSeo {...SEO} />
        <ThemeProvider
          defaultTheme="system"
          attribute="class"
          value={{ light: lightTheme.className, dark: darkTheme.className }}
        >
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeProvider>
      </NextUIProvider>
    </>
  );
}

export default MyApp;
