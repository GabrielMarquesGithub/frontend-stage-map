import { UseFormRegister, FieldErrorsImpl } from "react-hook-form";
import { Flex } from "@chakra-ui/react";

import { orderedType } from "../../../types/ordered";

import Input from "../../Form/Input";
import Textarea from "../../Form/Textarea";

//component type
type OrderedFormType = {
  disabled: boolean;
  errors: FieldErrorsImpl<orderedType>;
  register: UseFormRegister<orderedType>;
};

const OrderedForm = ({ disabled, errors, register }: OrderedFormType) => {
  return (
    <Flex flexDirection="column" gap="2">
      <Input
        error={errors.title?.message}
        mt="-10px"
        label="Titulo"
        type="text"
        isDisabled={disabled}
        {...register("title")}
      />
      <Flex flexDirection={["column", "row"]} gap="2">
        <Input
          error={errors.prediction?.message}
          mt="-10px"
          label="Previsão de entrega"
          type="date"
          isDisabled={disabled}
          {...register("prediction")}
        />
        <Input
          error={errors.deadline?.message}
          mt="-10px"
          label="Data limite"
          type="date"
          isDisabled={disabled}
          {...register("deadline")}
        />
      </Flex>
      <Flex flexDirection={["column", "row"]} gap="2">
        <Input
          error={errors.created_at?.message}
          mt="-10px"
          label="Data de criação"
          type="date"
          isDisabled
          {...register("created_at")}
        />
        <Input
          error={errors.updated_at?.message}
          mt="-10px"
          label="Ultima atualização"
          type="date"
          isDisabled
          {...register("updated_at")}
        />
      </Flex>
      <Textarea
        error={errors.description?.message}
        mt="-10px"
        label="Descrição"
        isDisabled={disabled}
        {...register("description")}
      />
    </Flex>
  );
};

export default OrderedForm;
