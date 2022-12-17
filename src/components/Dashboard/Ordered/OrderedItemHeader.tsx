import { Flex, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

import { orderedCardType } from "../../../types/ordered";
import { orderedIcons } from "../../../utils/project/enums/orderedIcons";

type OrderedItemHeaderType = Pick<orderedCardType, "priority" | "title">;

const OrderedItemHeader = ({ priority, title }: OrderedItemHeaderType) => {
  return (
    <Flex as="header" alignItems="center" justifyContent="space-between">
      <h3>{title}</h3>
      <Icon
        fontSize="x-large"
        as={orderedIcons[priority] as unknown as IconType}
        className="ordered-body-icon"
      />
    </Flex>
  );
};

export default OrderedItemHeader;
