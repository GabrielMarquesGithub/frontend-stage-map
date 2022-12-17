import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import buildCookiesActions from "../cookies/buildCookiesActions";

//função buscando validar a existência de um visitante já com token
export default function SSGWithGuestVerification<
  P extends { [key: string]: any } //restrição imposta pelo next
>(SSGFunction: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    //busca por um token
    const { getCookies } = buildCookiesActions(ctx);

    //se existir o token o visitante será mandado ao dashboard
    if (getCookies("stageMap.auth.token")) {
      return {
        redirect: { destination: "/dashboard", permanent: false },
      };
    }
    //se não existir o token será executada o SSGFunction normalmente
    return SSGFunction(ctx);
  };
}
