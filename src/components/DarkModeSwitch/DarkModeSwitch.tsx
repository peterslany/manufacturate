import { Switch, useColorMode } from "@chakra-ui/react";
import { ReactElement } from "react";

export function DarkModeSwitch(): ReactElement {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      colorScheme="whiteAlpha"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
}
export default DarkModeSwitch;
