import { defineStyleConfig, defineStyle } from "@chakra-ui/react";

const icon = defineStyle({
  color: "pink.500",
  bg: "gray.900",
  _hover: { bg: "gray.800" },
});

export const buttonTheme = defineStyleConfig({
  variants: {
    icon,
  },
});
