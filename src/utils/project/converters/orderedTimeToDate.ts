import { orderedType } from "../../../types/ordered";

import dateTimeToDate from "../../converters/dateTimeToDate";

export default function orderedTimeToDate(ordered: orderedType): orderedType {
  return {
    ...ordered,
    deadline: dateTimeToDate(ordered.deadline),
    prediction: dateTimeToDate(ordered.prediction),
    created_at: dateTimeToDate(ordered.created_at),
    updated_at: dateTimeToDate(ordered.updated_at),
  };
}
