import { extendTheme } from "@chakra-ui/react";

// Brand palette derived from the Bizport Solutions logo: deep emerald green
// as primary, warm amber as the accent (from the logo's orange sphere).
const colors = {
  primary: {
    50: "#e9f7f0",
    100: "#c8ecd9",
    200: "#a3e0c0",
    300: "#7bd3a5",
    400: "#4bbf82",
    500: "#0f7a4a", // brand green
    600: "#0c6a3f",
    700: "#095633",
    800: "#074327",
    900: "#04301b",
  },
  accent: {
    50: "#fef6ec",
    100: "#fce7c9",
    200: "#fad5a0",
    300: "#f7c078",
    400: "#f4a94f",
    500: "#ef9330", // brand amber/orange
    600: "#d97a1c",
    700: "#b06015",
    800: "#874910",
    900: "#5e330a",
  },
  ink: {
    50: "#f5f7f8",
    100: "#e7ebee",
    200: "#cbd3d9",
    300: "#a7b3bc",
    400: "#788793",
    500: "#546472",
    600: "#3d4a56",
    700: "#2c3740",
    800: "#1c242b",
    900: "#10151a",
  },
};

const fonts = {
  heading: `'Plus Jakarta Sans', 'Segoe UI', sans-serif`,
  body: `'Inter', 'Segoe UI', sans-serif`,
};

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors,
  fonts,
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
        color: props.colorMode === "dark" ? "gray.100" : "ink.800",
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "lg",
      },
      defaultProps: {
        colorScheme: "primary",
      },
    },
    Link: {
      baseStyle: {
        fontWeight: "500",
      },
    },
  },
});

export default theme;
