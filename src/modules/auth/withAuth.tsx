import { useSession } from "next-auth/client";
import { ReactElement } from "react";
import UnauthorizedAccess from "./UnauthorizedAccess";

export default function withAuth<ComponentProps>(
  Component: React.FC<ComponentProps>
): React.FC<ComponentProps> {
  function WithAuth(props: ComponentProps): ReactElement {
    const [session] = useSession();
    return session ? <Component {...props} /> : <UnauthorizedAccess />;
  }

  const componentName = Component.displayName || Component.name || "Component";

  WithAuth.displayName = `withAuth(${componentName})`;

  return WithAuth;
}
