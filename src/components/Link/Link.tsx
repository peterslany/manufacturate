import { chakra, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement, ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode; // children should always be non-interactive elements (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
  onClick?: () => void;
}

function Link({ href, children, onClick }: LinkProps): ReactElement {
  return (
    <NextLink href={href} passHref>
      <ChakraLink onClick={onClick}> {children}</ChakraLink>
    </NextLink>
  );
}
export default chakra(Link);
