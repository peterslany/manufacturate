import { chakra, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement, ReactNode } from "react";

interface LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  // children should always be non-interactive elements (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
  onClick?: () => void;
}

function Link({ href, children, onClick, className }: LinkProps): ReactElement {
  return (
    <NextLink href={href} passHref>
      <ChakraLink className={className} onClick={onClick}>
        {children}
      </ChakraLink>
    </NextLink>
  );
}
export default chakra(Link);
