import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    orange: {
      50: "#ffecda",
      100: "#ffd1ae",
      200: "#ffb87d",
      300: "#ffa24b",
      400: "#ff8f1a",
      500: "#e67d00",
      600: "#b35500",
      700: "#813400",
      800: "#4f1900",
      900: "#1f0400",
    },
    yellow: {
      50: "#fffadd",
      100: "#fcf1b3",
      200: "#f8e785",
      300: "#f6dd56",
      400: "#f3d429",
      500: "#d9ba11",
      600: "#a99109",
      700: "#796804",
      800: "#483e00",
      900: "#1a1500",
    },
    gray: {
      "50A05": "#f7fcfc05",
      "50A10": "#f7fcfc10",
      "900A05": "#17192305",
      "900A10": "#17192310",
    },
    red: {
      50: "#ffe5e9",
      100: "#fbbac1",
      200: "#f28e95",
      300: "#eb6166",
      400: "#e43535",
      500: "#ca1b27",
      600: "#9e1327",
      700: "#710c22",
      800: "#460517",
      900: "#1e000a",
    },
    green: {
      50: "#e1feeb",
      100: "#b8f8cb",
      200: "#8cf1a9",
      300: "#60ec82",
      400: "#35e76b",
      500: "#1dcd5e",
      600: "#2e825d",
      700: "#1f5d46",
      800: "#0f392c",
      900: "#00150d",
    },
    blue: {
      50: "#e4f1ff",
      100: "#b8cffc",
      200: "#8baaf5",
      300: "#5e83ee",
      400: "#3159e8",
      500: "#174cce",
      600: "#0f45a1",
      700: "#083975",
      800: "#032749",
      900: "#00111e",
    },
  },
  fonts: {
    body: "Montserrat, sans-serif",
    paragraph: "Cardo, serif",
  },
  textStyles: {
    serif: {
      fontFamily: "Cardo, serif",
    },
    600: {
      fontWeight: 600,
    },
  },
  layerStyles: {
    outline: {
      border: "1px solid",
      borderColor: "initial",
      background: "transparent",
    },
    focus: {
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    outlineFocused: {
      border: "1px solid",
      borderColor: "initial",
      background: "transparent",
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    glassLight: {
      backdropFilter: "blur(5px)",
      backgroundColor: "gray.900A05",
    },
    glassDark: {
      backdropFilter: "blur(5px)",
      backgroundColor: "gray.50A05",
    },
  },
  styles: {
    global: {
      "::--webkit-scrollbar": {
        width: "80px",
        scrollbarColor: "red yellow",
      },
    },
  },
  breakpoints,
});

export default theme;
