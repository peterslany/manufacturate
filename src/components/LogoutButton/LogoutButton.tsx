import { signOut } from "next-auth/client";
import { ReactElement } from "react";
import { Button } from "..";
import { useLocale } from "../../hooks";

export default function LogoutButton(): ReactElement {
  const { Message } = useLocale();
  return (
    <Button layerStyle="outline" onClick={() => signOut({ callbackUrl: "/" })}>
      {Message.LOG_OUT}
    </Button>
  );
}
