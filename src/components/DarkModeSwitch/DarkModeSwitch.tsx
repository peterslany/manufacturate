import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { ReactElement } from "react";
import { useLocale } from "../../hooks";

export function DarkModeSwitch(): ReactElement {
  const { Message } = useLocale();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <IconButton
      aria-label={Message.TOGGLE_COLOR_MODE}
      layerStyle="outline16"
      onClick={toggleColorMode}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
export default DarkModeSwitch;
