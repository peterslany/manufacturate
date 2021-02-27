import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}

function RatingDetail({}: Props): ReactElement {
  const {
    query: { name },
  } = useRouter();
  return <div>{name}</div>;
}

export default RatingDetail;
