import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { Button, ColorModeToggle, Link, LogoutButton } from "..";
import {
  authHeaderItems,
  HEADER_HEIGHT,
  Path,
  publicHeaderItems,
} from "../../constants";
import { useLocale, useSmallScreen } from "../../hooks";
import { HeaderItemSubMenuType } from "../../types";
import LocaleChange from "../LocaleChange/LocaleChange";
import HeaderSearch from "../Searchbar/HeaderSearchbar";
import HeaderDrawer from "./HeaderDrawer";
import HeaderItem from "./HeaderItem";
import HeaderItemSubMenu from "./HeaderItemSubMenu";

function Header(): ReactElement {
  const { Message } = useLocale();

  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = useDisclosure();

  const { route } = useRouter();

  const isSmallScreen = useSmallScreen();

  const glass = useColorModeValue("glassLight", "glassDark");

  const [session] = useSession();

  const items = (
    <Flex
      as="nav"
      justify="space-evenly"
      flex="1 auto"
      direction={["column", "column", "row"]}
    >
      {(session ? authHeaderItems(session.user.isAdmin) : publicHeaderItems)
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
        })}
    </Flex>
  );

  return (
    <Flex
      as="header"
      h={HEADER_HEIGHT}
      align="center"
      justify="space-between"
      position="fixed"
      width="full"
      px={[2, 3, 4, 5]}
      layerStyle={glass}
      zIndex="10"
    >
      {isSmallScreen ? (
        <>
          <Button
            layerStyle="outline"
            borderRadius="16px"
            p={0}
            onClick={openDrawer}
            ariaLabel={Message.ARIA_LABEL_MENU}
          >
            <HamburgerIcon aria-label={Message.ARIA_LABEL_MENU} />
          </Button>
          <Heading size="md">FAIR ABOUT CARE</Heading>
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
        </>
      )}
      {session ? <LogoutButton /> : <HeaderSearch />}
      {!isSmallScreen && (
        <Flex align="center" justify="space-between" ml="2">
          <LocaleChange isHiddenLabel />
          <Box ml="2">
            <ColorModeToggle />
          </Box>
        </Flex>
      )}
      <HeaderDrawer
        {...{ items, isOpen: isDrawerOpen, onClose: closeDrawer }}
      />
    </Flex>
  );
}

export default Header;
