import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import Router from "next/router";

import baseFetchFunction from "../../utils/fetch/baseFetchFunction";
import authenticatedFetchFunction from "../../utils/fetch/authenticatedFetchFunction";
import buildCookiesActions from "../../utils/cookies/buildCookiesActions";

type userType = {
  name: string;
  email: string;
};

type authenticationResponseType = {
  token: string;
  user: userType;
};

type signInCredentialsType = {
  name: string;
  password: string;
};

type AuthContextDataType = {
  signIn(credentials: signInCredentialsType): Promise<boolean>; //função de autenticação
  signOut(): void;
  isAuthenticated: boolean; //se o user está autenticado
  user: userType | null; //dados do usuário
};

type AuthProviderPropsType = { children: ReactNode };

//esse contexto busca, mantém e desconecta user
export const AuthContext = createContext({} as AuthContextDataType);

export const AuthProvider = ({ children }: AuthProviderPropsType) => {
  //estado para armazenar user
  const [user, setUser] = useState<userType | null>(null);

  //se existir user o autenticação está ativa
  const isAuthenticated = !!user;

  const { getCookies, setCookie, deleteCookie } = useMemo(
    () => buildCookiesActions(undefined),
    []
  );

  //função de autenticação
  const signIn = async ({
    name,
    password,
  }: signInCredentialsType): Promise<boolean> => {
    //estruturando dados
    const data = { name, password };
    //chamada a API
    const response = await baseFetchFunction<authenticationResponseType>(
      process.env.NEXT_PUBLIC_BASE_URL + "/login",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    //tratamento de erro
    if (response.errors || !response.data) return false;

    //desestruturando dados
    const { token, user } = response.data;

    setCookie("stageMap.auth.token", token);

    //setando o usuário
    setUser(user);

    return true;
  };

  //funções para logout
  const signOut = useCallback(() => {
    (async () => {
      //desestruturando em busca de cookies
      const token = getCookies("stageMap.auth.token");

      //realizando logout no sanctum
      await authenticatedFetchFunction(
        process.env.NEXT_PUBLIC_BASE_URL + "/logout",
        token,
        {
          method: "POST",
        }
      );
    })();

    //destruição de cookies
    deleteCookie("stageMap.auth.token");
    //removendo user
    setUser(null);
    Router.push("/");
  }, [getCookies, deleteCookie]);

  //função de atualização dos dados
  useEffect(() => {
    //desestruturando em busca de cookies
    const token = getCookies("stageMap.auth.token");
    //função que se auto chama
    (async () => {
      if (token) {
        //buscando user já autenticando
        const response = await authenticatedFetchFunction<{ user: userType }>(
          process.env.NEXT_PUBLIC_BASE_URL + "/token",
          getCookies("stageMap.auth.token")
        );

        //tratamento de erro
        if (response.errors || !response.data) return signOut();

        //setando o usuário
        return setUser(response.data.user);
      }
    })();
  }, [getCookies, signOut]);

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
