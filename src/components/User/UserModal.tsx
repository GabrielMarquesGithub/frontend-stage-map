import { useContext } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { AuthContext } from "../../Contexts/AuthContext";

type UserModalType = Pick<ModalProps, "isOpen" | "onClose">;

const UserModal = ({ ...rest }: UserModalType) => {
  const { signOut } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Modal isCentered {...rest}>
      <ModalOverlay />
      <ModalContent bgColor="gray.900">
        <ModalCloseButton />
        <ModalHeader
          textAlign="center"
          as="h2"
          textTransform="uppercase"
          p="0"
          m="15px"
        >
          Usuário
        </ModalHeader>
        <ModalBody p="5px" mx="15px"></ModalBody>
        <ModalFooter display="flex" gap="2" p="0" m="15px">
          <Button
            bg="pink.500"
            _hover={{ bg: "pink.600" }}
            onClick={handleSignOut}
            w="100%"
          >
            Desconectar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
