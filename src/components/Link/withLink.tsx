import { LinkBox, LinkOverlay, VisuallyHidden } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactElement } from "react";

interface WithLinkProps {
  href: string;
  linkText: string; // invisible text to be placed inside <a> tag for SEO
  target?: string;
}

export default function withLink<ComponentProps>(
  Component: React.FC<
    Pick<
      WithLinkProps & ComponentProps,
      Exclude<keyof ComponentProps, "href" | "linkText" | "target">
    >
  >
): React.FC<WithLinkProps & ComponentProps> {
  function WithLink({
    href,
    linkText,
    target,
    ...props
  }: WithLinkProps & ComponentProps): ReactElement {
    return (
      <LinkBox role="group">
        <NextLink href={href} passHref>
          <LinkOverlay target={target}>
            <VisuallyHidden>{linkText}</VisuallyHidden>
          </LinkOverlay>
        </NextLink>
        <Component {...props} />
      </LinkBox>
    );
  }

  const componentName = Component.displayName || Component.name || "Component";

  WithLink.displayName = `withLink(${componentName})`;

  return WithLink;
}
