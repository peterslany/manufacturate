import React, { ReactElement } from "react";
import MyAccount from "../../modules/auth/myAccount";

interface Props {}

function MyAccountPage({}: Props): ReactElement {
  return <MyAccount />;
}

export default MyAccountPage;
