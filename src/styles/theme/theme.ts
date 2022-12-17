import { extendTheme } from "@chakra-ui/react";

import { colors } from "./colors";

import { alertTheme } from "./componentsThemes/alertTheme";
import { buttonTheme } from "./componentsThemes/buttonTheme";
import { modalTheme } from "./componentsThemes/modalTheme";

export const theme = extendTheme({
  colors,
  fonts: {
    body: "roboto",
    heading: "roboto",
    mono: "roboto",
  },
  styles: {
    global: {
      body: {
        bg: "blackAlpha.800",
        color: "white",
      },
      "::-webkit-scrollbar": {
        w: "8px",
        h: "8px",
      },
      "::-webkit-scrollbar-track": {
        bg: "gray.500",
        borderRadius: "full",
        m: "4px",
      },
      "::-webkit-scrollbar-thumb": {
        bg: "white",
        borderRadius: "full",
      },
    },
  },
  components: {
    Button: buttonTheme,
    Alert: alertTheme,
    Modal: modalTheme,
  },
});
