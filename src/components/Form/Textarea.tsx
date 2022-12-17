import { forwardRef, ForwardRefRenderFunction } from "react";
import {
  Textarea as ChakraTextarea,
  TextareaProps,
  FormLabel,
  FormControl,
  FormErrorMessage,
  InputGroup,
} from "@chakra-ui/react";

type TextareaType = {
  name: string;
  error?: string;
  label?: string;
  placeholder?: string;
  height?: Pick<TextareaProps, "height">;
} & TextareaProps;

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaType
> = ({ name, placeholder, label, error, height, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <ChakraTextarea
          name={name}
          placeholder={placeholder ? placeholder : ""}
          size="sm"
          variant="unstyled"
          bg="gray.700"
          borderRadius="md"
          padding="2"
          height={height ? height : 200}
          border="2px"
          borderColor="gray.700"
          resize="none"
          _focus={{ bg: "gray.900", borderColor: "pink.500" }}
          _disabled={{
            cursor: "default",
            bg: "gray.800",
            borderColor: "gray.800",
          }}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

const Textarea = forwardRef(TextareaBase);
export default Textarea;
