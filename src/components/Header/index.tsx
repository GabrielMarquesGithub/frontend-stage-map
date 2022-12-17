import { useRouter } from "next/router";
import { Container, Flex, Grid, GridItem } from "@chakra-ui/react";

import Logo from "./Logo";
import NavLink from "./NavLink";
import NavLinks from "./NavLinks";
import UserIcon from "./UserIcon";

const Header = () => {
  const { asPath } = useRouter();

  return (
    <Container userSelect="none" as="header" maxWidth="container.lg" px="8">
      <Grid
        height={["40", "40", "20"]}
        gap="5"
        alignItems="center"
        gridTemplateColumns={["200px 1fr", "200px 1fr", "200px 1fr 50px"]}
        templateAreas={[
          '"logo avatar""nav nav"',
          '"logo avatar""nav nav"',
          '"logo nav avatar"',
        ]}
      >
        <GridItem area="logo" display="flex" justifyContent="flex-start">
          <Logo>Confecção</Logo>
        </GridItem>
        <GridItem
          area="nav"
          display="flex"
          justifyContent={["center", "center", "flex-end"]}
        >
          <Flex justifyContent="space-between" alignItems="center" gap="10">
            <NavLinks>
              <NavLink active={asPath.includes("/dashboard")} href="/dashboard">
                Pedidos
              </NavLink>
              <NavLink active={asPath.includes("/usuarios")} href="/usuarios">
                Usuários
              </NavLink>
            </NavLinks>
          </Flex>
        </GridItem>
        <GridItem area="avatar" display="flex" justifyContent="flex-end">
          <UserIcon />
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Header;
