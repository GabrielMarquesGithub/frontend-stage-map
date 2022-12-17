import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

import MyLink from "../Link/MyLink";

type LogoType = {
  children: ReactNode;
};

const Logo = ({ children }: LogoType) => {
  return (
    <Box as="h1">
      <MyLink
        href="/dashboard"
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="3xl"
        color="pink.500"
        _hover={{ textDecor: "none" }}
      >
        {children}
      </MyLink>
    </Box>
  );
};

export default Logo;
