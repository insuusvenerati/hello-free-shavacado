import { NextUIProvider } from "@nextui-org/react";
import { createTheme } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import SEO from "../../next-seo.config";

const lightTheme = createTheme({
  type: "light",
  theme: {},
});

const darkTheme = createTheme({
  type: "dark",
  theme: {},
});

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
          <Component {...pageProps} />
        </NextUIProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
