import { GetServerSidePropsContext } from "next";
import {
  parseCookies,
  setCookie as nookiesSetCookie,
  destroyCookie,
} from "nookies";

export default function buildCookiesActions(
  ctx: GetServerSidePropsContext | undefined
) {
  const getCookies = (cookieName: string) => {
    const cookies = parseCookies(ctx);
    return cookies[cookieName];
  };

  const setCookie = (cookieName: string, value: string) => {
    nookiesSetCookie(ctx, cookieName, value, {
      maxAge: 60 * 60 * 24 * 30, //30 days
      path: "/", // quando só tem a barra todos os path tem acesso
    });
  };

  const deleteCookie = (cookieName: string) => {
    destroyCookie(ctx, cookieName);
  };

  const cookiesActions = { getCookies, setCookie, deleteCookie };

  return cookiesActions;
}
