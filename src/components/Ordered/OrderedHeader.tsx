import { Flex, Heading } from "@chakra-ui/react";

import { orderedType } from "../../types/ordered";

import { orderedColor } from "../../utils/project/enums/orderedColor";
import { ReactNode } from "react";

type OrderedHeaderType = Pick<orderedType, "priority" | "title"> & {
  children?: ReactNode;
};

const OrderedHeader = ({ title, priority, children }: OrderedHeaderType) => {
  return (
    <Flex
      h="200px"
      w="full"
      position="relative"
      flexDirection="column"
      borderTopRadius="3xl"
      borderBottomRadius="md"
      bgGradient={`linear(to-br,${
        orderedColor[priority as keyof typeof orderedColor]
      })`}
    >
      <Heading
        as="h1"
        fontSize={["30", "40", "50"]}
        fontWeight="bold"
        textTransform="uppercase"
        lineHeight="200px"
        textAlign="center"
      >
        {title}
      </Heading>
      <Flex
        position="absolute"
        right="2"
        bottom="2"
        gap="2"
        justifyContent="flex-end"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default OrderedHeader;
