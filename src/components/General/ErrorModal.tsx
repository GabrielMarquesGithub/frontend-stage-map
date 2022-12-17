import {
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

type ErrorModalType = Pick<
  ModalProps,
  "onClose" | "isCentered" | "isOpen" | "blockScrollOnMount"
> & {
  ErrorMessage: string;
};

const ErrorModal = ({ ErrorMessage, ...rest }: ErrorModalType) => {
  return (
    <Modal {...rest}>
      <ModalOverlay />
      <ModalContent bgColor="red.500" maxW="300px">
        <ModalCloseButton />
        <ModalHeader
          textAlign="center"
          as="h2"
          textTransform="uppercase"
          userSelect="none"
        >
          Erro
        </ModalHeader>
        <ModalBody textAlign="center">
          <Text fontSize="sm">{ErrorMessage}</Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            w="full"
            bg="gray.900"
            _hover={{ bg: "gray.800" }}
            onClick={rest.onClose}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ErrorModal;
