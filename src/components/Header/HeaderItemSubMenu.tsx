import {
  Box,
  Collapse,
  Flex,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import { Link } from "..";
import { HeaderItemSubMenuType } from "../../types";
import HeaderItem from "./HeaderItem";

interface Props {
  selected: boolean;
  label: string;
  path: string;
  subMenu: HeaderItemSubMenuType;
  isSmallScreen: boolean;
  onItemClick?: () => void;
}

function HeaderItemSubMenu({
  selected,
  label,
  path,
  subMenu,
  isSmallScreen,
  onItemClick,
}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  const dividerBorderColor = useColorModeValue("gray.300", "gray.600");

  const content = (
    <Flex justify="space-between" direction={isSmallScreen ? "column" : "row"}>
      {subMenu.body.items.map(({ label: bodyItemLabel, items }) => (
        <Box
          {...(isSmallScreen
            ? {
                mb: 4,
                pt: 4,
                pl: 4,
                w: "full",
                borderTop: "1px solid gray",
                borderColor: dividerBorderColor,
              }
            : {
                _notFirst: {
                  borderLeft: "1px solid gray",
                  borderColor: dividerBorderColor,
                  pl: 6,
                },
              })}
          key={bodyItemLabel}
        >
          <Heading
            whiteSpace="nowrap"
            size="sm"
            pr={6}
            pb={1}
            textTransform="uppercase"
          >
            {bodyItemLabel}
          </Heading>

          <Flex direction="column" pr={6}>
            {items?.map(({ label: bodySubItemLabel, value }) => (
              <Link
                whiteSpace="nowrap"
                key={value}
                onClick={onItemClick}
                href={`${path}?${subMenu.body.parameter}=${value}`}
              >
                - {bodySubItemLabel}
              </Link>
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
  );

  return !isSmallScreen ? (
    <Popover
      trigger="hover"
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    >
      <PopoverTrigger>
        <Box role="button">
          <HeaderItem
            path={path}
            label={label}
            selected={selected}
            isOpen={isOpen}
            isSmallScreen={isSmallScreen}
            onItemClick={() => null}
            withChevron
          />
        </Box>
      </PopoverTrigger>
      <PopoverContent width="fit-content">
        <PopoverHeader>
          <Link href={subMenu.header.path}>{subMenu.header.label}</Link>
        </PopoverHeader>
        <PopoverBody>{content}</PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <>
      <HeaderItem
        path={path}
        label={label}
        selected={selected}
        isOpen={isOpen}
        isSmallScreen={isSmallScreen}
        onItemClick={() => setIsOpen((prev) => !prev)}
        withChevron
      />
      <Collapse in={isOpen} animateOpacity>
        <Link
          onClick={onItemClick}
          href={subMenu.header.path}
          p={4}
          display="inline-block"
          w="full"
        >
          - {subMenu.header.label}
        </Link>
        {content}
      </Collapse>
    </>
  );
}

export default HeaderItemSubMenu;
