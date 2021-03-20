import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { DarkModeSwitch } from "..";

interface Props {
  isOpen: boolean;
  items: ReactNode;
  onClose: () => void;
}

function HeaderDrawer({ items, isOpen, onClose }: Props): ReactElement {
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
            <DarkModeSwitch />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default HeaderDrawer;
