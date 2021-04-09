import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  chakra,
  useColorMode,
} from "@chakra-ui/react";
import React, { ReactElement, ReactNode } from "react";
import { addToColor } from "../../utils";

interface ButtonProps extends ChakraButtonProps {
  ariaLabel?: string;
  backgroundColor?: string;
  children: ReactNode;
  onClick?: () => void;
}

function Button({
  onClick,
  backgroundColor,
  children,
  variant,
  className,
  isDisabled,
  type,
  ariaLabel,
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
    if (onClick) {
      onClick();
    }
  };
  return (
    <ChakraButton
      disabled={isDisabled}
      p={4}
      onClick={onClick && handleClick}
      background={variant === "outline" ? "inherit" : background}
      _hover={{ background: hoverBackground }}
      {...{ className, variant, type, "aria-label": ariaLabel }}
    >
      {children}
    </ChakraButton>
  );
}

export default chakra(Button);
