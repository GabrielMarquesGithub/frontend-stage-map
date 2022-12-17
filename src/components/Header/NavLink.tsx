import { ReactNode } from "react";

import MyLink from "../Link/MyLink";

type NavLinkType = {
  children: ReactNode;
  active: boolean;
  href: string;
};

const NavLink = ({ children, href, active }: NavLinkType) => {
  return (
    <MyLink
      href={href}
      borderBottom="2px solid"
      borderColor={active ? "pink.500" : "transparent"}
      py="2"
      _hover={{
        textDecor: "none",
        borderBottom: "2px solid",
        borderColor: "pink.500",
      }}
    >
      {children}
    </MyLink>
  );
};

export default NavLink;
