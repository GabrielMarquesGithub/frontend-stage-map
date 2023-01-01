import { useRouter } from "next/router";
import { Flex, GridItem } from "@chakra-ui/react";

import { orderedCardType } from "../../../types/ordered";
import { orderedColor } from "../../../utils/project/enums/orderedColor";

import OrderedItemBody from "./OrderedItemBody";
import OrderedItemHeader from "./OrderedItemHeader";

type OrderedItemType = orderedCardType;

const OrderedItem = ({
  id,
  title,
  deadline,
  priority,
  client,
  stage,
}: OrderedItemType) => {
  const { push } = useRouter();

  const handleClick = () => push(`/pedido/${id}`);

  return (
    <GridItem
      cursor="pointer"
      w="full"
      bgGradient={`linear(to-br,${orderedColor[priority]})`}
      borderRadius="xl"
      p="3"
      maxH="150px"
      minH="125px"
      _hover={{
        transition: "filter 0.2s",
        filter: "brightness(0.95)",
        ".ordered-body-icon": {
          transition: "transform 0.2s",
          transform: "scale(1.1)",
        },
      }}
      onClick={handleClick}
    >
      <Flex gap="4" flexDirection="column">
        <OrderedItemHeader priority={priority} title={title} />
        <OrderedItemBody client={client} deadline={deadline} stage={stage} />
      </Flex>
    </GridItem>
  );
};

export default OrderedItem;
