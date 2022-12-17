import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import Head from "next/head";

import { stageType } from "../../types/ordered";
import { ErrorsCodes } from "../../utils/project/enums/errorsCodes";

import Ordered from "../../templates/ordered";

import { OrderedPageProvider } from "../../Contexts/OrderedPageContext";
import SSGWithAuthorizationCheck from "../../utils/server-side-check/SSGWithAuthorizationCheck";
import buildCookiesActions from "../../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../../utils/fetch/authenticatedFetchFunction";

type CreateOrderedPageType = {
  data: {
    stage: stageType[];
  };
};

const CreateOrderedPage: NextPage<CreateOrderedPageType> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{"Confecção - Criar Novo Pedido"}</title>
      </Head>
      <OrderedPageProvider stage={data.stage} editable={true}>
        <Ordered />
      </OrderedPageProvider>
    </>
  );
};

export default CreateOrderedPage;

export const getServerSideProps = SSGWithAuthorizationCheck<any>(
  async (ctx) => {
    type stageJSONType = {
      data: stageType[];
    };

    //send token
    const { getCookies, deleteCookie } = buildCookiesActions(ctx);
    const token = getCookies("stageMap.auth.token");

    //uso da fetch function
    const requestStageJSON = await authenticatedFetchFunction<stageJSONType>(
      process.env.NEXT_PUBLIC_BASE_URL_STAGE!,
      token
    );

    //tratamento de erros
    try {
      //erros vindo das requisições
      if (requestStageJSON.errors != null) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //erros no formato do dados
      if (!requestStageJSON.data || !requestStageJSON.data.data) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //tradução dos dados recebidos ao formato ideal para consumo
      const data = {
        stage: requestStageJSON.data.data,
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
