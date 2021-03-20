import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { ApiUrl } from "../../constants";
import { useGet } from "../../hooks";
import { RatingLocalized } from "../../types/ratings";

interface Props {}

function RatingDetail({}: Props): ReactElement {
  const {
    query: { name },
  } = useRouter();

  const { data } = useGet<RatingLocalized>(
    name && `${ApiUrl.RATINGS}/${name}?localize=true`
  );
  return <div>{JSON.stringify(data)}</div>;
}

export default RatingDetail;
