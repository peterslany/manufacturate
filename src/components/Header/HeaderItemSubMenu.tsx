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

  return !isSmallScreen ? (
    <>
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
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">
            <Link href={subMenu.header.path}>{subMenu.header.label}</Link>
          </PopoverHeader>
          <PopoverBody>
            <Heading size="md" mb={4}>
              {subMenu.body.label}
            </Heading>
            <Flex justify="space-between">
              {subMenu.body.items.map(({ label: bodyItemLabel, items }) => (
                <div key={bodyItemLabel}>
                  <Heading size="sm">{bodyItemLabel}</Heading>{" "}
                  {items?.map(({ label: bodySubItemLabel, value }) => (
                    <Link
                      key={value}
                      href={`${path}?${subMenu.body.parameter}=${value}`}
                    >
                      {bodySubItemLabel}
                    </Link>
                  ))}
                </div>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  ) : (
    <>
      <Box role="button" onClick={() => setIsOpen((prev) => !prev)}>
        <HeaderItem
          path={path}
          label={label}
          selected={selected}
          isOpen={isOpen}
          isSmallScreen={isSmallScreen}
          withChevron
        />
      </Box>
      <Collapse in={isOpen} animateOpacity>
        <Heading size="md" mb={4}>
          {subMenu.body.label}
        </Heading>
        <Flex justify="space-between">
          {subMenu.body.items.map(({ label: bodyItemLabel, items }) => (
            <div key={bodyItemLabel}>
              <Heading size="sm">{bodyItemLabel}</Heading>{" "}
              {items?.map(({ label: bodySubItemLabel, value }) => (
                <Link
                  onClick={onItemClick}
                  key={value}
                  href={`${path}?${subMenu.body.parameter}=${value}`}
                >
                  {bodySubItemLabel}
                </Link>
              ))}
            </div>
          ))}
        </Flex>
      </Collapse>
    </>
  );
}

export default HeaderItemSubMenu;
