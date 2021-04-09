/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactElement } from "react";
import { useLocale } from "../../hooks";
import { LocaleMessage } from "../../types";

interface Props {
  dontRedirect?: boolean;
  isOpen?: boolean;
  isSmallScreen: boolean;
  label: LocaleMessage;
  onItemClick?: () => void;
  path: string;
  selected: boolean;
  withChevron?: boolean;
}

function HeaderItem({
  path,
  label,
  selected,
  isSmallScreen,
  onItemClick,
  withChevron,
  dontRedirect,
  isOpen,
}: Props): ReactElement {
  const { colorMode } = useColorMode();
  const { localizeMessage, Message } = useLocale();

  const color = (() => {
    switch (colorMode) {
      case "dark":
        return selected ? "teal.700" : "none";
      default:
        return selected ? "green.100" : "none";
    }
  })();

  const hoverColor = (() => {
    switch (colorMode) {
      case "dark":
        return selected ? "teal.600" : "gray.700";
      default:
        return selected ? "green.200" : "gray.200";
    }
  })();

  const item = (
    <Link
      p={4}
      background={color}
      borderRadius={24}
      _hover={{ background: hoverColor }}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      onClick={onItemClick}
      borderWidth={1}
      borderColor="initial"
      {...{
        textStyle: selected ? "600" : "",
        w: isSmallScreen ? "full" : "initial",
        mb: isSmallScreen ? 2 : 0,
      }}
    >
      {localizeMessage(label)}
      {withChevron && (
        <ChevronDownIcon
          transition="transform 300ms ease-in-out"
          transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
          aria-label={Message.ARIA_LABEL_CHEVRON}
          _groupHover={{
            transform: "rotate(180deg)",
            transition: "transform 300ms ease-in-out",
          }}
        />
      )}
    </Link>
  );

  return dontRedirect ? (
    item
  ) : (
    <NextLink href={path} passHref>
      {item}
    </NextLink>
  );
}

export default HeaderItem;
