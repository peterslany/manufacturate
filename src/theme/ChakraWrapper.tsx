import {
  ChakraProvider,
  cookieStorageManager,
  localStorageManager,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ReactElement, ReactNode } from "react";
import { isString } from "util";
import theme from ".";
import Fonts from "./Fonts";
import MDEditor from "./MDEditor";
import Scrollbar from "./Scrollbar";

interface ChakraWrapperProps {
  children: ReactNode;
  cookies: unknown;
}

export function ChakraWrapper({
  cookies,
  children,
}: ChakraWrapperProps): ReactElement {
  const colorModeManager = isString(cookies)
    ? cookieStorageManager(cookies)
    : localStorageManager;

  return (
    <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
      <Fonts />
      <Scrollbar />
      <MDEditor />
      {children}
    </ChakraProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
};
