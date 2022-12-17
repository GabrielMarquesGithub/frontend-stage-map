import { modalAnatomy } from "@chakra-ui/anatomy";
import { defineStyle, createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  modalAnatomy.keys
);

const dialogContainer = defineStyle({
  m: "5px",
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle: {
    dialog: {
      m: "2",
    },
  },
});
