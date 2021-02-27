import {
  Button as ChakraButton,
  ButtonProps,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { addToColor } from "../../utils/color";

interface ButstonProps extends ButtonProps {
  onClick: () => void;
  backgroundColor?: string;
  children: ReactNode;
}

function Button({
  onClick,
  backgroundColor,
  children,
  variant,
  ...props
}: ButtonProps): ReactElement {
  const { colorMode } = useColorMode();

  const background = (() => {
    switch (colorMode) {
      case "dark":
        return backgroundColor ? addToColor(backgroundColor, 400) : "gray.700";
      default:
        return backgroundColor || "gray.100";
    }
  })();

  const hoverBackground = (() => {
    switch (colorMode) {
      case "dark":
        return backgroundColor ? addToColor(backgroundColor, 300) : "gray.700";
      default:
        return backgroundColor ? addToColor(backgroundColor, -100) : "gray.200";
    }
  })();
  return (
    <ChakraButton
      p={4}
      borderRadius={24}
      onClick={onClick}
      background={variant === "outline" ? "inherit" : background}
      _hover={{ background: hoverBackground }}
      {...{ ...props, variant }}
    >
      {children}
    </ChakraButton>
  );
}

export default chakra(Button);
