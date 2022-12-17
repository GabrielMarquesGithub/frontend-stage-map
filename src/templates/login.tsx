import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Button, Flex } from "@chakra-ui/react";

import * as yup from "yup";

import DarkContainer from "../components/BodyStyle/DarkContainer";
import Input from "../components/Form/Input";
import { AuthContext } from "../Contexts/AuthContext";

//form data type
type SignInFormDataType = {
  name: string;
  password: string;
};

const schema = yup
  .object({
    name: yup.string().required("Usuário obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve possuir no mínimo 6 caracteres")
      .required("Senha obrigatória"),
  })
  .required();

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormDataType>({
    resolver: yupResolver(schema),
  });

  const { push } = useRouter();
  const { signIn } = useContext(AuthContext);

  //personal error
  const [apiError, setApiError] = useState("");

  const handleSignIn = async (data: SignInFormDataType) => {
    setApiError("");
    const isAuthenticated = await signIn(data);
    if (!isAuthenticated) return setApiError("Usuário ou Senha incorretos");
    push("/dashboard");
  };

  return (
    <Flex alignItems="center" justifyContent="center" w="100vw" h="100vh">
      <DarkContainer as="main">
        <Flex
          as="form"
          p="7"
          userSelect="none"
          flexDirection="column"
          gap="5"
          w={["250", "300px", "350px"]}
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Input
            error={errors.name?.message || apiError}
            type="text"
            placeholder="Usuário"
            {...register("name")}
          />
          <Input
            error={errors.password?.message}
            type="password"
            placeholder="Senha"
            {...register("password")}
          />
          <Button
            isLoading={isSubmitting}
            type="submit"
            bg="pink.500"
            _hover={{ bg: "pink.600" }}
            _active={{ bg: "pink.600" }}
          >
            Entrar
          </Button>
        </Flex>
      </DarkContainer>
    </Flex>
  );
};

export default Login;
