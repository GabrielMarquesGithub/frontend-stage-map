import { FieldErrorsImpl, UseFormRegister } from "react-hook-form";
import { Flex } from "@chakra-ui/react";

import { orderedType } from "../../../types/ordered";

import Input from "../../Form/Input";

//component type
type ClientFormType = {
  disabled: boolean;
  errors: FieldErrorsImpl<orderedType>;
  register: UseFormRegister<orderedType>;
};

const ClientForm = ({ disabled, errors, register }: ClientFormType) => {
  return (
    <Flex flexDirection="column" gap="2">
      <Input
        error={errors.client?.name?.message}
        mt="-10px"
        label="Nome"
        type="text"
        isDisabled={disabled}
        {...register("client.name")}
      />
      <Input
        error={errors.client?.fone?.message}
        mt="-10px"
        label="Telefone"
        type="text"
        isDisabled={disabled}
        {...register("client.fone")}
      />
      <Input
        error={errors.client?.email?.message}
        mt="-10px"
        label="Email"
        type="text"
        isDisabled={disabled}
        {...register("client.email")}
      />
    </Flex>
  );
};

export default ClientForm;
