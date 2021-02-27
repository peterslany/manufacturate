import { useColorModeValue } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import * as React from "react";

const Scrollbar = () => {
  const [lightColor, darkColor] = ["#CBD5E0", "#2D3748"];
  const light = `
    * {
        scrollbar-color: ${darkColor} ${lightColor} ;
      }
      ::-webkit-scrollbar {
        background: ${lightColor};
    
      }
      ::-webkit-scrollbar-thumb {
        background: white;
        border: 1px solid;
        border-radius: 8px;
        border-color: initial;
      }
      `;

  const dark = `* {
    scrollbar-color: ${lightColor} ${darkColor};
}
::-webkit-scrollbar {
  background: ${darkColor};

}
::-webkit-scrollbar-thumb {
  background: transparent;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${lightColor};
}`;
  const styles = useColorModeValue(light, dark);
  return <Global styles={styles} />;
};
export default Scrollbar;
