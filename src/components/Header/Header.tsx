import { ArrowBackIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { DarkModeSwitch, Link } from "..";
import { headerItems, HEADER_HEIGHT, Path } from "../../constants";
import useSmallScreen from "../../hooks/useSmallScreen";
import { HeaderItemSubMenuType } from "../../types";
import Button from "../Button/Button";
import Searchbar from "../Searchbar";
import HeaderItem from "./HeaderItem";
import HeaderItemSubMenu from "./HeaderItemSubMenu";

function Header(): ReactElement {
  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const [showSearchbar, setShowSearchbar] = useState(false);

  const { route } = useRouter();

  const isSmallScreen = useSmallScreen();

  const headerStyle = useColorModeValue("glassLight", "glassDark");
  const drawerBackground = useColorModeValue("white", "gray.800");

  const items = headerItems
    .filter(({ onlyInDrawer }) => !onlyInDrawer || isSmallScreen)
    .map(({ path, subMenu, ...props }) => {
      const Component = subMenu ? HeaderItemSubMenu : HeaderItem;
      return (
        <Component
          key={path}
          selected={route === path}
          onItemClick={closeDrawer}
          {...{
            ...props,
            path,
            isSmallScreen,
            ...{
              subMenu: subMenu as HeaderItemSubMenuType,
            },
          }}
        />
      );
    });

  const drawer = (
    <Drawer isOpen={isDrawerOpen} onClose={closeDrawer} placement="left">
      <DrawerOverlay>
        <DrawerContent background={drawerBackground}>
          <DrawerHeader
            onClick={closeDrawer}
            borderBottomWidth="1px"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
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

  return (
    <Flex
      h={HEADER_HEIGHT}
      align="center"
      justify="space-between"
      position="fixed"
      width="full"
      px={[2, 4, 6]}
      layerStyle={headerStyle}
      zIndex="1"
    >
      {isSmallScreen ? (
        <>
          <Button
            layerStyle="outline"
            p={0}
            borderRadius={16}
            onClick={openDrawer}
            {...(showSearchbar ? { mr: 4 } : {})}
          >
            <HamburgerIcon />
          </Button>
          <Heading size="md" {...(showSearchbar ? { lineHeight: 0.8 } : {})}>
            FAIR ABOUT CARE
          </Heading>
        </>
      ) : (
        <>
          <Link
            href={Path.ROOT}
            _hover={{ textDecor: "none", color: "green.600" }}
          >
            <Heading textAlign="end" lineHeight={0.8} fontSize="1.6rem">
              FAIR
              <br /> ABOUT
              <br /> .CARE
            </Heading>
          </Link>
          {items}
          <DarkModeSwitch />
        </>
      )}
      {drawer}
      <Searchbar
        onShowTextFieldCallback={() => setShowSearchbar((prev) => !prev)}
      />
    </Flex>
  );
}

export default Header;
