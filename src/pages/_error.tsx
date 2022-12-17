import Head from "next/head";
import { Container, Heading } from "@chakra-ui/react";

import Header from "../components/Header";
import { ErrorsCodes } from "../utils/project/enums/errorsCodes";

type ErrorPageType = {
  code?: ErrorsCodes;
};

const ErrorPage = ({ code }: ErrorPageType) => {
  let error = {
    code: "ERRO",
    message: "Ocorreu Algum Erro",
  };

  switch (code) {
    case "400":
      error = {
        code: "400",
        message: "Erro ao requisitar dados",
      };
      break;
    case "404":
      error = {
        code: "404",
        message: "Pagina não encontrada",
      };
      break;
  }

  return (
    <>
      <Head>
        <title>Confecção - {error.code}</title>
      </Head>
      <Header />
      <Container
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        height="400px"
        cursor="default"
      >
        <Heading as="h1" color="gray.900" fontSize="8xl">
          {error.code}
        </Heading>
        <Heading
          borderTop="2px solid"
          borderColor="pink.500"
          pt="10px"
          as="h3"
          color="gray.900"
          fontSize="medium"
        >
          {error.message}
        </Heading>
      </Container>
    </>
  );
};

export default ErrorPage;
