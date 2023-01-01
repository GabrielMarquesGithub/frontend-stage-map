import { useEffect, useRef, useState } from "react";
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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

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

//form data type
type createUserFormDataType = {
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
};

const schema = yup
  .object({
    name: yup.string().required("O Usuário deve ter um nome"),
    email: yup
      .string()
      .email("formato do email incorreto")
      .required("O Usuário deve ter um Email"),
    role: yup.string().required("O usuário deve ter uma função atribuída"),
    password: yup
      .string()
      .min(6, "A senha deve possuir no mínimo 6 caracteres")
      .required("O Usuário deve ter uma senha"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser iguais"),
  })
  .required();

const User = ({ users }: UserType) => {
  //validação de formulário
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormDataType>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  //personal error
  const [apiError, setApiError] = useState("");
  //loading
  const [isLoading, setIsLoading] = useBoolean(false);

  //estado dos items do componente
  const [usersState, setUsersState] = useState(users);

  const [sectors, setSectors] = useState<{ sector: string }[]>();

  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //controle modal
  const [userModalState, setUserModalState] = useBoolean(false);

  const handleCreate = async (data: createUserFormDataType) => {
    setIsLoading.on();
    setApiError("");
    const url = process.env.NEXT_PUBLIC_BASE_URL + "/user";

    type userJSONType = {
      data: {
        user: userType;
      };
    };

    const res = await authenticatedFetchFunction<userJSONType>(url, authToken, {
      method: "POST",
      body: JSON.stringify(data),
    });

    //lidando com possíveis erros na requisição
    if (res.errors || !res.data || !res.data.data || !res.data.data.user) {
      setIsLoading.off();
      return setApiError("Usuário ou Email já existentes");
    }

    setUsersState([...usersState, res.data.data.user]);

    setUserModalState.off();
    setIsLoading.off();
  };

  useEffect(() => {
    (async () => {
      const url = process.env.NEXT_PUBLIC_BASE_URL + "/sector";
      const method = "GET";

      type sectorJSONType = {
        data: {
          sector: string;
        }[];
      };

      const res = await authenticatedFetchFunction<sectorJSONType>(
        url,
        authToken,
        {
          method: method,
        }
      );

      //lidando com possíveis erros na requisição
      if (res.errors || !res.data || !res.data.data) {
      } else {
        setSectors(res.data.data);
      }
    })();
  }, []);

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
              error={errors.name?.message || apiError}
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
            <Select
              bg="gray.700"
              colorScheme="purple"
              variant="filled"
              focusBorderColor="pink.500"
              _hover={{}}
              sx={{ option: { background: "gray.700" } }}
              {...register("role")}
            >
              {sectors?.map((sector, index) => (
                <option key={index} value={sector.sector}>
                  {sector.sector}
                </option>
              ))}
            </Select>
            <Input
              error={errors.email?.message || apiError}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <Input
              error={errors.password?.message}
              type="password"
              placeholder="Senha"
              {...register("password")}
            />
            <Input
              error={errors.password_confirmation?.message}
              type="password"
              placeholder="Confirme a Senha"
              {...register("password_confirmation")}
            />
          </ModalBody>
          <ModalFooter display="flex" gap="2" p="0" m="15px">
            <Button
              isLoading={isLoading}
              colorScheme="pink"
              onClick={handleSubmit(handleCreate)}
              w="100%"
            >
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
            {usersState.map((usersState) => (
              <UserItem key={usersState.id} user={usersState} />
            ))}
          </UnorderedList>
        </DarkContainer>
      </Container>
    </>
  );
};

export default User;
