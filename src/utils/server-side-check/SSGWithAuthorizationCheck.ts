import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import buildCookiesActions from "../cookies/buildCookiesActions";

//função checa validade do token
export default function SSGWithAuthorizationCheck<
  P extends { [key: string]: any } //restrição imposta pelo next
>(SSGFunction: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    //busca por um token
    const { getCookies } = buildCookiesActions(ctx);

    //se não existir o token o visitante será mandado a tela de signIn
    if (!getCookies("stageMap.auth.token")) {
      return {
        redirect: { destination: "/", permanent: false },
      };
    }
    //se não existir o token será executada o SSGFunction normalmente
    return SSGFunction(ctx);
  };
}
