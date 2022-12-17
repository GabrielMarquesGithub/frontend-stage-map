import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  Input as ChakraInput,
  InputProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputGroup,
} from "@chakra-ui/react";

type InputType = {
  name: string;
  type: string;
  error?: string;
  label?: string;
  placeholder?: string;
} & InputProps;

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputType> = (
  { name, type, placeholder, label, error, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <ChakraInput
          type={type}
          name={name}
          placeholder={placeholder ? placeholder : ""}
          bg="gray.700"
          colorScheme="purple"
          variant="filled"
          focusBorderColor="pink.500"
          _hover={{}}
          _disabled={{ cursor: "default", bg: "gray.800" }}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

const Input = forwardRef(InputBase);
export default Input;
