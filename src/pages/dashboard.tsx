import type { NextPage } from "next";

import Head from "next/head";

import { orderedCardDataType, orderedCardType } from "../types/ordered";
import { ErrorsCodes } from "../utils/project/enums/errorsCodes";

import SSGWithAuthorizationCheck from "../utils/server-side-check/SSGWithAuthorizationCheck";
import buildCookiesActions from "../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../utils/fetch/authenticatedFetchFunction";

import Header from "../components/Header";
import Home from "../templates/home";

type HomePageType = {
  data: orderedCardDataType;
};

const HomePage: NextPage<HomePageType> = ({ data }) => {
  return (
    <>
      <Head>
        <title>Confecção - Pagina Inicial</title>
      </Head>
      <Header />
      <Home ordered={data} />
    </>
  );
};

export default HomePage;

export const getServerSideProps = SSGWithAuthorizationCheck<any>(
  async (ctx) => {
    const { query } = ctx;
    //para realização da paginação
    const page = query.page || 1;

    //tipagem do JSON esperado
    type orderedCartJSONType = {
      data: orderedCardType[];
      meta: {
        total: number;
      };
    };
    //get token
    const { getCookies, deleteCookie } = buildCookiesActions(ctx);
    const token = getCookies("stageMap.auth.token");

    //uso da fetch function
    const requestJSON = await authenticatedFetchFunction<orderedCartJSONType>(
      process.env.NEXT_PUBLIC_BASE_URL_ORDERED + "?page=" + page,
      token
    );

    //tratamento de erros
    try {
      //erros vindo da requisição
      if (requestJSON.errors != null) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //erros no formato do dados
      if (
        !requestJSON.data ||
        !requestJSON.data.data ||
        !requestJSON.data.meta ||
        !requestJSON.data.meta.total
      ) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //tradução dos dados recebidos ao formato ideal para consumo
      const data = {
        ordered: requestJSON.data.data,
        orderedQuantity: requestJSON.data.meta.total,
      };
      return {
        props: {
          data,
        },
      };
    } catch (errors) {
      deleteCookie("stageMap.auth.token");
      return {
        props: {
          errors,
        },
      };
    }
  }
);
