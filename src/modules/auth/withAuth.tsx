import { useSession } from "next-auth/client";
import { ReactElement } from "react";
import UnauthorizedAccess from "./UnauthorizedAccess";

export default function withAuth<ComponentProps>(
  Component: React.FC<ComponentProps>,
  admin?: boolean
): React.FC<ComponentProps> {
  function WithAuth(props: ComponentProps): ReactElement {
    const [session] = useSession();
    return (admin ? session?.user.isAdmin : session) ? (
      <Component {...props} />
    ) : (
      <UnauthorizedAccess />
    );
  }

  const componentName = Component.displayName || Component.name || "Component";

  WithAuth.displayName = `withAuth(${componentName})`;

  return WithAuth;
}
