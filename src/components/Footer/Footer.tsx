import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { ReactElement } from "react";
import { Link } from "..";

interface Props {}

function Footer({}: Props): ReactElement {
  const [session] = useSession();
  return (
    <Flex as="footer" p="8" bg="yellow.200">
      FOOTER
      {session?.user.username}
      <Link ml="8" href="/auth/login">
        Prihlasenie
      </Link>
    </Flex>
  );
}

export default Footer;
