import Router from "next/router";
import { useRef } from "react";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  UnorderedList,
  useBoolean,
} from "@chakra-ui/react";

import { userType } from "../types/user";

import apearAnimation from "../styles/animations/apearAnimation";

import buildCookiesActions from "../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../utils/fetch/authenticatedFetchFunction";

import DarkContainer from "../components/BodyStyle/DarkContainer";
import UserItem from "../components/User/UserItem";
import Input from "../components/Form/Input";

type UserType = {
  users: userType[];
};

const User = ({ users }: UserType) => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //controle modal
  const [userModalState, setUserModalState] = useBoolean(false);

  const userNameInput = useRef<HTMLInputElement>(null);
  const userRoleInput = useRef<HTMLSelectElement>(null);
  const userEmailInput = useRef<HTMLInputElement>(null);
  const userPasswordInput = useRef<HTMLInputElement>(null);

  const handleCreate = async () => {
    const url = process.env.NEXT_PUBLIC_BASE_URL_USER!;

    const data = {
      name: userNameInput.current?.value,
      email: userEmailInput.current?.value,
      role: userRoleInput.current?.value,
      password: userPasswordInput.current?.value,
      password_confirmation: userPasswordInput.current?.value,
    };

    console.log(data);

    const res = await authenticatedFetchFunction(url, authToken, {
      method: "POST",
      body: JSON.stringify(data),
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
      {" "}
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
            Novo Usuário
          </ModalHeader>
          <ModalBody
            display="flex"
            flexDirection="column"
            p="5px"
            mx="15px"
            gap="2"
          >
            <Input
              name="userName"
              ref={userNameInput}
              type="text"
              placeholder="Nome"
            />
            <Select
              bg="gray.700"
              ref={userRoleInput}
              colorScheme="purple"
              variant="filled"
              focusBorderColor="pink.500"
              _hover={{}}
              sx={{ option: { background: "gray.700" } }}
            >
              <option value="admin">Admin</option>
              <option value="user">Funcionário</option>
            </Select>
            <Input
              name="userEmail"
              ref={userEmailInput}
              type="email"
              placeholder="Email"
            />
            <Input
              name="userPassword"
              ref={userPasswordInput}
              type="password"
              placeholder="Senha"
            />
          </ModalBody>
          <ModalFooter display="flex" gap="2" p="0" m="15px">
            <Button colorScheme="pink" onClick={handleCreate} w="100%">
              Criar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Container as="main" maxW="container.sm" p="8">
        <DarkContainer animation={apearAnimation({ milliseconds: 600 })}>
          <Button
            w="100%"
            mb="3"
            colorScheme="pink"
            onClick={setUserModalState.on}
          >
            Novo Usuário
          </Button>
          <UnorderedList styleType="none" m="0">
            {users.map((user) => (
              <UserItem key={user.id} user={user} />
            ))}
          </UnorderedList>
        </DarkContainer>
      </Container>
    </>
  );
};

export default User;
