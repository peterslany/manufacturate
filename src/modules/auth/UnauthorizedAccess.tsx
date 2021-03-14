import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Link } from "../../components";

interface Props {}

function UnauthorizedAccess({}: Props): ReactElement {
  const { route } = useRouter();
  return (
    <div>
      You are trying to access non-public page without authorization, go{" "}
      <Link href="/">home</Link> or{" "}
      <Link href={`/auth/login?callbackUrl=${route}`}>log in</Link>.
    </div>
  );
}

export default UnauthorizedAccess;
