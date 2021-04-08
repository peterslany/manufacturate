import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { useLocale } from "../../hooks";
import ColorModeToggle from "../ColorModeToggle";
import LocaleChange from "../LocaleChange/LocaleChange";

interface Props {
  isOpen: boolean;
  items: ReactNode;
  onClose: () => void;
}

function HeaderDrawer({ items, isOpen, onClose }: Props): ReactElement {
  const { Message } = useLocale();

  const glass = useColorModeValue("glassLight", "glassDark");
  const overlayShadowColor = useColorModeValue("#00000050", "#ffffff80");
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay layerStyle={glass}>
        <DrawerContent
          boxShadow={`0 0 50px -20px ${overlayShadowColor}`}
          layerStyle={glass}
        >
          <DrawerHeader
            onClick={onClose}
            borderBottomWidth="1px"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            borderColor="initial"
          >
            Menu
            <ArrowBackIcon />
          </DrawerHeader>
          <DrawerBody>
            {items}
            <Divider
              borderBottom="1px solid"
              borderColor="initial"
              opacity="1"
              my="4"
            />
            <LocaleChange />
            <Divider
              borderBottom="1px solid"
              borderColor="initial"
              opacity="1"
              my="4"
            />

            <Flex mb="4" justify="space-between" align="center">
              {Message.TOGGLE_COLOR_MODE} <ColorModeToggle />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default HeaderDrawer;
