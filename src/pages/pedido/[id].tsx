import { GetServerSideProps, NextPage } from "next";
import nookies from "nookies";
import Head from "next/head";

import { orderedType, stageType } from "../../types/ordered";
import { ErrorsCodes } from "../../utils/project/enums/errorsCodes";

import orderedTimeToDate from "../../utils/project/converters/orderedTimeToDate";

import Ordered from "../../templates/ordered";

import { OrderedPageProvider } from "../../Contexts/OrderedPageContext";
import SSGWithAuthorizationCheck from "../../utils/server-side-check/SSGWithAuthorizationCheck";
import buildCookiesActions from "../../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../../utils/fetch/authenticatedFetchFunction";

type OrderedPageType = {
  data: {
    ordered: orderedType;
    stage: stageType[];
  };
};

const OrderedPage: NextPage<OrderedPageType> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{"Confecção - " + data.ordered.title}</title>
      </Head>
      <OrderedPageProvider
        ordered={data.ordered}
        stage={data.stage}
        editable={false}
      >
        <Ordered />
      </OrderedPageProvider>
    </>
  );
};

export default OrderedPage;

export const getServerSideProps = SSGWithAuthorizationCheck<any>(
  async (ctx) => {
    const { query } = ctx;
    const { id } = query;

    //validação do formato do ID
    if (Number.isNaN(Number(id))) {
      return {
        notFound: true,
      };
    }

    type orderedJSONType = {
      data: orderedType;
    };
    type stageJSONType = {
      data: stageType[];
    };

    const { getCookies, deleteCookie } = buildCookiesActions(ctx);
    const token = getCookies("stageMap.auth.token");

    //uso da fetch function
    const requestOrderedJSON =
      await authenticatedFetchFunction<orderedJSONType>(
        process.env.NEXT_PUBLIC_BASE_URL + "/ordered/" + id,
        token
      );
    const requestStageJSON = await authenticatedFetchFunction<stageJSONType>(
      process.env.NEXT_PUBLIC_BASE_URL + "/stage",
      token
    );

    //tratamento de erros
    try {
      //erros vindo das requisições
      if (
        requestOrderedJSON.errors != null ||
        requestStageJSON.errors != null
      ) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //erros no formato do dados
      if (
        !requestOrderedJSON.data ||
        !requestOrderedJSON.data.data ||
        !requestStageJSON.data ||
        !requestStageJSON.data.data
      ) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //tradução dos dados recebidos ao formato ideal para consumo
      const data = {
        ordered: orderedTimeToDate(requestOrderedJSON.data.data),
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
