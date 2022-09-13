import Document, { Head, Html, Main, NextScript } from "next/document";
import Meta from "../components/Meta";
export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Meta />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
