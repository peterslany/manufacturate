import { Center, Progress } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { ReactElement } from "react";
import { UnauthorizedAccess } from "../components";
import { useLocale } from "../hooks";

export default function withAuth<ComponentProps>(
  Component: React.FC<ComponentProps>,
  admin?: boolean
): React.FC<ComponentProps> {
  function WithAuth(props: ComponentProps): ReactElement {
    const { Message } = useLocale();

    const [session, loading] = useSession();

    return loading ? (
      <Center py="8" flexDirection="column">
        {Message.AUTHORIZING_USER}
        <Progress
          isAnimated
          hasStripe
          w="full"
          h="4"
          colorScheme="yellow"
          value={100}
        />
      </Center>
    ) : (
      <>
        {(admin ? session?.user.isAdmin : session) ? (
          <Component {...props} />
        ) : (
          <UnauthorizedAccess />
        )}
      </>
    );
  }

  const componentName = Component.displayName || Component.name || "Component";

  WithAuth.displayName = `withAuth(${componentName})`;

  return WithAuth;
}
