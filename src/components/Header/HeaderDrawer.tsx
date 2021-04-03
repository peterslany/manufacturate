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
import DarkModeSwitch from "../DarkModeSwitch";
import LocaleChange from "../LocaleChange/LocaleChange";

interface Props {
  isOpen: boolean;
  items: ReactNode;
  onClose: () => void;
}

function HeaderDrawer({ items, isOpen, onClose }: Props): ReactElement {
  const { Message } = useLocale();

  const drawerContentBg = useColorModeValue("gray.900A10", "gray.50A10");
  const drawerOverlayBg = useColorModeValue("gray.50A99", "gray.900A99");

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
      <DrawerOverlay bgColor={drawerOverlayBg}>
        <DrawerContent layerStyle="glassLight" bgColor={drawerContentBg}>
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

            <Flex justify="space-between" align="center">
              {Message.TOGGLE_COLOR_MODE} <DarkModeSwitch />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default HeaderDrawer;
