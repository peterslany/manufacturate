import { signOut } from "next-auth/client";
import { ReactElement } from "react";
import { Button } from "..";

export default function LogoutButton(): ReactElement {
  return (
    <Button layerStyle="outline" onClick={() => signOut({ callbackUrl: "/" })}>
      Odhlásiť sa
    </Button>
  );
}
