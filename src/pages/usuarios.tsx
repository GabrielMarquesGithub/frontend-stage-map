import type { NextPage } from "next";

import Head from "next/head";

import { ErrorsCodes } from "../utils/project/enums/errorsCodes";
import { UsersDataType, userType } from "../types/user";

import SSGWithAuthorizationCheck from "../utils/server-side-check/SSGWithAuthorizationCheck";
import buildCookiesActions from "../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../utils/fetch/authenticatedFetchFunction";

import Header from "../components/Header";
import User from "../templates/user";

type UserPageType = UsersDataType;

const UserPage: NextPage<UserPageType> = ({ users }) => {
  return (
    <>
      <Head>
        <title>Confecção - Usuários</title>
      </Head>
      <Header />
      <User users={users} />
    </>
  );
};

export default UserPage;

export const getServerSideProps = SSGWithAuthorizationCheck<any>(
  async (ctx) => {
    //tipagem do JSON esperado
    type userJSONType = {
      data: userType[];
    };

    //get token
    const { getCookies, deleteCookie } = buildCookiesActions(ctx);
    const token = getCookies("stageMap.auth.token");

    //uso da fetch function
    const requestJSON = await authenticatedFetchFunction<userJSONType>(
      process.env.NEXT_PUBLIC_BASE_URL_USER!,
      token
    );

    //tratamento de erros
    try {
      //erros vindo da requisição
      if (requestJSON.errors != null) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //erros no formato do dados
      if (!requestJSON.data || !requestJSON.data.data) {
        throw ErrorsCodes.BAD_REQUEST;
      }
      //tradução dos dados recebidos ao formato ideal para consumo
      const users = requestJSON.data.data;

      return {
        props: {
          users,
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
