import { Grid } from "@chakra-ui/react";

import { orderedCardDataType } from "../../../types/ordered";

import Pagination from "../../Pagination/Pagination";
import CreateOrderedButton from "./CreateOrderedButton";
import OrderedItem from "./OrderedItem";

type OrderedContainerType = orderedCardDataType;

const OrderedContainer = ({
  ordered,
  orderedQuantity,
}: OrderedContainerType) => {
  return (
    <>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="2">
        <CreateOrderedButton />
        {ordered?.map((orderedItem) => (
          <OrderedItem key={orderedItem.id} {...orderedItem} />
        ))}
      </Grid>
      {orderedQuantity && (
        <Pagination
          itemsQuantity={orderedQuantity}
          itemsPerPage={11}
          pageRangeDisplayed={2}
        />
      )}
    </>
  );
};

export default OrderedContainer;
