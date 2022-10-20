import Document, { Head, Html, Main, NextScript } from "next/document";
import Meta from "../components/Common/Meta";
export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <Meta isDoc={true} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
