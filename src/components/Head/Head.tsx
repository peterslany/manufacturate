import NextHead from "next/head";
import React, { ReactElement } from "react";
import createFullTitle from "./utils";

interface Props {
  metaDescription?: string;
  title: string;
}

function Head({ title, metaDescription }: Props): ReactElement {
  return (
    <NextHead>
      <title>{createFullTitle(title)}</title>
      <meta name="description" content={metaDescription || ""} />
    </NextHead>
  );
}

export default Head;
