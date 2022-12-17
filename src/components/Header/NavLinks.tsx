import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

type NavLinksType = {
  children: ReactNode;
};

const NavLinks = ({ children }: NavLinksType) => {
  return (
    <Flex as="nav" gap="5">
      {children}
    </Flex>
  );
};

export default NavLinks;
