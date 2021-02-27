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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { DarkModeSwitch, Link } from "..";
import { headerItems, HEADER_HEIGHT } from "../../constants";
import useSmallScreen from "../../hooks/useSmallScreen";
import { HeaderItemSubMenuType } from "../../types";
import Button from "../Button/Button";
import HeaderItem from "./HeaderItem";
import HeaderItemSubMenu from "./HeaderItemSubMenu";
import HeaderSearchbar from "./HeaderSearchbar";

interface Props {
  page: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Header({ page }: Props): ReactElement {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [showSearchbar, setShowSearchbar] = useState(false);

  const { route } = useRouter();

  const isSmallScreen = useSmallScreen();

  const headerBackground = useColorModeValue("gray.900A05", "gray.50A05");
  const drawerBackground = useColorModeValue("white", "gray.800");

  const items = headerItems
    .filter(({ onlyInDrawer }) => !onlyInDrawer || isSmallScreen)
    .map(({ path, subMenu, ...props }) => {
      const Component = subMenu ? HeaderItemSubMenu : HeaderItem;
      return (
        <Component
          key={path}
          selected={route === path}
          onItemClick={() => setIsDrawerOpen(false)}
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
      background={headerBackground}
      sx={{ backdropFilter: "blur(5px)" }}
    >
      {isSmallScreen ? (
        <>
          <Button
            layerStyle="outline"
            p={0}
            borderRadius={16}
            onClick={() => setIsDrawerOpen(true)}
            {...(showSearchbar ? { mr: 4 } : {})}
          >
            <HamburgerIcon />
          </Button>{" "}
          <Heading size="md" {...(showSearchbar ? { lineHeight: 0.8 } : {})}>
            FAIR ABOUT CARE
          </Heading>
        </>
      ) : (
        <>
          <Link href="/">
            <Heading textAlign="end" lineHeight={0.8} fontSize="1.6rem">
              FAIR
              <br /> ABOUT
              <br /> .CARE
            </Heading>{" "}
          </Link>
          {items}
          <DarkModeSwitch />
        </>
      )}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        placement="left"
      >
        <DrawerOverlay>
          <DrawerContent background={drawerBackground}>
            <DrawerHeader
              onClick={() => setIsDrawerOpen(false)}
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
      <HeaderSearchbar {...{ showSearchbar, setShowSearchbar }} />
    </Flex>
  );
}

export default Header;
