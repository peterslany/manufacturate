import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { addToColor } from "../../utils";

interface ButtonProps extends ChakraButtonProps {
  onClick: () => void;
  backgroundColor?: string;
  children: ReactNode;
}

function Button({
  onClick,
  backgroundColor,
  children,
  variant,
  className,
  isDisabled,
  type,
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

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClick();
  };
  return (
    <ChakraButton
      disabled={isDisabled}
      p={4}
      onClick={handleClick}
      background={variant === "outline" ? "inherit" : background}
      _hover={{ background: hoverBackground }}
      {...{ className, variant, type }}
    >
      {children}
    </ChakraButton>
  );
}

export default chakra(Button);
