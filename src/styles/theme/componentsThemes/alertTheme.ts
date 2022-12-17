import { alertAnatomy } from "@chakra-ui/anatomy";
import { defineStyle, createMultiStyleConfigHelpers } from "@chakra-ui/react";

import apearAnimation from "../../animations/apearAnimation";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  alertAnatomy.keys
);

const container = defineStyle({
  animation: apearAnimation({
    milliseconds: 200,
    direction: "right",
  }),
  borderRadius: "md",
  bg: "red.500",
});

export const alertTheme = defineMultiStyleConfig({
  baseStyle: {
    container,
  },
});
