import { useRouter } from "next/router";
import { Flex, GridItem, Heading, Icon } from "@chakra-ui/react";

import { MdAddBox } from "react-icons/md";

const CreateOrderedButton = () => {
  const { push } = useRouter();

  const handleClick = () => push(`/pedido/criar`);

  return (
    <GridItem
      cursor="pointer"
      w="full"
      bgGradient={`linear(to-br,pink.600, pink.300)`}
      borderRadius="xl"
      p="3"
      maxH="150px"
      minH="125px"
      _hover={{
        ".myIcon": {
          transform: "translate(40px) rotate(270deg)",
          transition: "transform 0.5s",
        },
        ".myHeading": {
          opacity: "1",
        },
      }}
      onClick={handleClick}
    >
      <Flex
        userSelect="none"
        alignItems="center"
        position="relative"
        justifyContent="center"
        h="full"
      >
        <Icon
          position="absolute"
          transition="transform 0.5s 0.2s"
          className="myIcon"
          fontSize="7xl"
          as={MdAddBox}
        />
        <Heading
          transform="translate(-40px)"
          transition="0.2s 0.2s ease-in-out"
          opacity="0"
          className="myHeading"
          fontSize="2xl"
        >
          Novo <br /> Pedido
        </Heading>
      </Flex>
    </GridItem>
  );
};

export default CreateOrderedButton;
