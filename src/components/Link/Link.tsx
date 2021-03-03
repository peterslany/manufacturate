import { chakra, Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement, ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode; // children should always be non-interactive elements (https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element)
  onClick?: () => void;
  className?: string;
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
