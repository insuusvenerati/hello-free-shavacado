import Document, { Html, Head, Main, NextScript } from "next/document";
import { CssBaseline } from "@nextui-org/react";
import { HeadMeta } from "../components/HeadMeta";

// @ts-ignore
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: <>{initialProps.styles}</>,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <HeadMeta
            description="Search for Hello Fresh recipes by ingredient"
            title="Hello Free Shavacado"
          />
          {CssBaseline.flush()}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
