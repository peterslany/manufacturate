/* eslint-disable jsx-a11y/anchor-is-valid */
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link, useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactElement } from "react";

interface Props {
  path: string;
  label: string;
  selected: boolean;
  isSmallScreen: boolean;
  onItemClick?: () => void;
  withChevron?: boolean;
  isOpen?: boolean;
}

function HeaderItem({
  path,
  label,
  selected,
  isSmallScreen,
  onItemClick,
  withChevron,
  isOpen,
}: Props): ReactElement {
  const { colorMode } = useColorMode();

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

  return (
    <NextLink href={path} passHref>
      <Link
        p={4}
        background={color}
        borderRadius={24}
        _hover={{ background: hoverColor }}
        role="group"
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
        {label}
        {withChevron && (
          <ChevronDownIcon
            transition="transform 300ms ease-in-out"
            transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
            _groupHover={{
              transform: "rotate(180deg)",
              transition: "transform 300ms ease-in-out",
            }}
          />
        )}
      </Link>
    </NextLink>
  );
}

export default HeaderItem;
