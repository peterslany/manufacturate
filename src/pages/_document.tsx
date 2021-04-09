import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import { ReactElement } from "react";

export default class Document extends NextDocument {
  render(): ReactElement {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
