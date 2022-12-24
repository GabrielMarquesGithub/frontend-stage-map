import { Input, List, ListIcon, ListItem } from "@chakra-ui/react";

import { BsFillCalendar2EventFill, BsFillPersonFill } from "react-icons/bs";

import { orderedCardType } from "../../../types/ordered";

import dateTimeToDate from "../../../utils/converters/dateTimeToDate";

type OrderedItemBodyType = Pick<orderedCardType, "client" | "deadline">;

const OrderedItemBody = ({ client, deadline }: OrderedItemBodyType) => {
  return (
    <List spacing="3">
      <ListItem
        w="100%"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        <ListIcon as={BsFillPersonFill} />
        <span>{client.name}</span>
      </ListItem>
      <ListItem>
        <ListIcon as={BsFillCalendar2EventFill} />
        <Input
          type="date"
          display="inline"
          maxW="150px"
          p="0"
          cursor="pointer"
          isDisabled
          _disabled={{
            color: "white",
            border: "none",
          }}
          defaultValue={dateTimeToDate(deadline)}
        />
      </ListItem>
    </List>
  );
};

export default OrderedItemBody;
