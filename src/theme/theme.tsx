import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "486px",
  md: "832px",
  lg: "960px",
  xl: "1200px",
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
      700: "#b27f05",
      800: "#483e00",
      900: "#1a1500",
    },
    gray: {
      "50A05": "#f7fcfc05",
      "50A10": "#f7fcfc10",
      "50A20": "#f7fcfc20",
      "50A50": "#f7fcfc50",
      "50A99": "#f7fcfc99",
      "50AEE": "#f7fcfcee",
      "900A05": "#17192305",
      "900A10": "#17192310",
      "900A20": "#17192320",
      "900A50": "#17192350",
      "900A99": "#17192399",
      "900AEE": "#171923ee",
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
      "50A05": "#ffe5e905",
      "50A20": "#ffe5e920",
      "900A05": "#1e000a05",
      "900A20": "#1e000a20",
    },
    green: {
      50: "#e1feeb",
      100: "#b8f8cb",
      200: "#8cf1a9",
      300: "#60ec82",
      400: "#35e76b",
      500: "#38a168",
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
    layout: {
      padding: [4, 8, 16],
      paddingTop: [2, 4, 8],
    },
    outline: {
      border: "1px solid",
      borderColor: "initial",
      borderRadius: 24,
      background: "transparent",
    },
    outline16: {
      border: "1px solid",
      borderColor: "initial",
      borderRadius: 16,
      background: "transparent",
    },
    outlineFocused: {
      border: "1px solid",
      borderColor: "initial",
      borderRadius: 24,
      background: "transparent",
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    outline16Focused: {
      border: "1px solid",
      borderColor: "initial",
      borderRadius: 16,
      background: "transparent",
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    outlineError: {
      border: "1px solid",
      borderColor: "initial",
      borderRadius: 24,
      background: "transparent",
      boxShadow: "0 0 0 3px rgba(246, 72, 72, 0.8)",
    },
    outline16Error: {
      border: "1px solid",
      borderColor: "initial",
      borderRadius: 16,
      background: "transparent",
      boxShadow: "0 0 0 3px rgba(246, 72, 72, 0.8)",
    },
    focus: {
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    glassLight: {
      backgroundColor: "gray.50AEE",
      "@supports (backdrop-filter: blur(15px))": {
        backdropFilter: "brightness(140%) blur(15px) ",
        backgroundColor: "gray.50A20",
      },
    },
    glassDark: {
      backgroundColor: "gray.900AEE",
      "@supports (backdrop-filter: blur(15px))": {
        backdropFilter: "blur(15px) brightness(60%)",
        backgroundColor: "gray.900A20",
      },
    },
    dashed: {
      p: 4,
      border: "1px dashed gray",
    },
  },
  styles: {
    global: ({ colorMode }) => ({
      ".markdown": {
        ".chakra-link, .chakra-link > span": {
          textDecoration: "underline",
          color: colorMode === "dark" ? "blue.200" : "blue.600",
          "&:hover": {
            color: colorMode === "dark" ? "teal.200" : "teal.600",
          },
          "&:visited, &:visited > span": {
            color: colorMode === "dark" ? "purple.200" : "purple.600",
          },
        },
        h1: {
          fontSize: "5xl",
          fontWeight: "600",
        },
        h2: {
          fontSize: "4xl",
          fontWeight: "600",
        },
        h3: {
          fontSize: "3xl",
          fontWeight: "600",
        },
        h4: {
          fontSize: "2xl",
          fontWeight: "600",
        },
        h5: {
          fontSize: "xl",
          fontWeight: "600",
        },
        h6: {
          fontSize: "lg",
          fontWeight: "600",
        },
        img: {
          display: "block",
          margin: "auto",
          my: "4",
        },
        ".chakra-text": {
          marginBottom: 5,
        },
      },
      "*": {
        scrollbarColor:
          colorMode === "dark" ? "#CBD5E0 #2D3748" : "#2D3748 #CBD5E0",
        "::-webkit-scrollbar": {
          background: colorMode === "dark" ? "#2D3748" : "#CBD5E0",
        },
        "::-webkit-scrollbar-thumb": {
          background: colorMode === "dark" ? "#CBD5E0" : "#2D3748",
        },
      },
      ".editor-toolbar": {
        borderTopRadius: "16px",
      },
    }),
  },
  breakpoints,
});

export default theme;
