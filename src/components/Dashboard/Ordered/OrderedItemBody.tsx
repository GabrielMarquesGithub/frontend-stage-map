import { Input, List, ListIcon, ListItem } from "@chakra-ui/react";

import {
  BsFillCalendar2EventFill,
  BsFillPersonFill,
  BsFillGearFill,
} from "react-icons/bs";

import { orderedCardType } from "../../../types/ordered";

import dateTimeToDate from "../../../utils/converters/dateTimeToDate";

type OrderedItemBodyType = Pick<
  orderedCardType,
  "client" | "deadline" | "stage"
>;

const OrderedItemBody = ({ client, deadline, stage }: OrderedItemBodyType) => {
  return (
    <List spacing="0" fontSize="small">
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
          fontSize="small"
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
      {stage && stage.length > 0 && (
        <ListItem
          w="100%"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
        >
          <ListIcon as={BsFillGearFill} />
          {stage.map((stage, index) =>
            index === 0 ? stage.name : ", " + stage.name
          )}
        </ListItem>
      )}
    </List>
  );
};

export default OrderedItemBody;
