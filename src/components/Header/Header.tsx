import { HamburgerIcon } from "@chakra-ui/icons";
import {
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
import HeaderDrawer from "./HeaderDrawer";
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
      <Searchbar
        onShowTextFieldCallback={() => setShowSearchbar((prev) => !prev)}
      />
      <HeaderDrawer
        {...{ items, isOpen: isDrawerOpen, onClose: closeDrawer }}
      />
    </Flex>
  );
}

export default Header;