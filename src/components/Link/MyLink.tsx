import { ReactNode } from "react";
import Link from "next/link";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

type MyLinkType = {
  children: ReactNode;
  href: string;
} & LinkProps;

const MyLink = ({ children, href, ...rest }: MyLinkType) => {
  return (
    <Link href={href} passHref>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </Link>
  );
};
export default MyLink;
