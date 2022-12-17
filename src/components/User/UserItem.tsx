import {
  Avatar,
  Button,
  Flex,
  Icon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
  useBoolean,
} from "@chakra-ui/react";
import Router from "next/router";
import { BsFillTrashFill } from "react-icons/bs";

import { userType } from "../../types/user";

import buildCookiesActions from "../../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../../utils/fetch/authenticatedFetchFunction";
import Input from "../Form/Input";

type UserItemType = {
  user: userType;
};

const UserItem = ({ user }: UserItemType) => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //controle modal
  const [userModalState, setUserModalState] = useBoolean(false);

  const handleDelete = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_USER + "/" + user.id;

    const res = await authenticatedFetchFunction(url, authToken, {
      method: "DELETE",
    });

    //lidando com possíveis erros na requisição
    if (res.status === 409) {
    }
    if (res.errors) {
    }
    Router.reload();
  };

  return (
    <>
      <Modal isOpen={userModalState} onClose={setUserModalState.off} isCentered>
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
            Deletar ?
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            p="5px"
            mx="15px"
            gap="2"
          >
            <Input
              isDisabled
              name="userName"
              type="text"
              defaultValue={user.name}
            />
            <Input
              isDisabled
              name="userEmail"
              type="email"
              defaultValue={user.email}
            />
          </ModalBody>
          <ModalFooter display="flex" gap="2" p="0" m="15px">
            <Button colorScheme="red" onClick={handleDelete} w="100%">
              Apagar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ListItem
        display="flex"
        p="3"
        cursor="pointer"
        w="full"
        bg="gray.800"
        borderRadius="xl"
        _hover={{
          transition: "filter 0.2s",
          filter: "brightness(0.95)",
          ".ordered-body-icon": {
            transition: "transform 0.2s",
            transform: "scale(1.1)",
          },
        }}
        mb="1"
      >
        <Flex justifyContent="space-between" alignItems="center" w="100%">
          <Avatar boxSizing="content-box" border="2px solid" name={user.name} />
          <UnorderedList styleType="none" mr="10">
            <ListItem>
              <span>Nome - {user.name}</span>
            </ListItem>
            <ListItem>
              <span>Email - {user.email}</span>
            </ListItem>
          </UnorderedList>
          <Icon
            cursor="pointer"
            _hover={{
              transition: "transform 0.2s",
              transform: "scale(1.2)",
            }}
            as={BsFillTrashFill}
            onClick={setUserModalState.on}
          />
        </Flex>
      </ListItem>
    </>
  );
};

export default UserItem;
