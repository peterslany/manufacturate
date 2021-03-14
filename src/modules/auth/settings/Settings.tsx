import React, { ReactElement } from "react";
import withAuth from "../withAuth";

interface Props {}

function Settings({}: Props): ReactElement {
  return <div>Nastavenia</div>;
}

export default withAuth(Settings);
