import { NextUIProvider } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";
import { QueryClient, QueryClientProvider } from "react-query";

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
      <DefaultSeo {...SEO} />
      <ThemeProvider
        defaultTheme="system"
        attribute="class"
        value={{ light: lightTheme.className, dark: darkTheme.className }}
      >
        <NextUIProvider>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </NextUIProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
