import type { NextPage } from "next";
import Head from "next/head";

import SSGWithGuestVerification from "../utils/server-side-check/SSGWithGuestVerification";

import Login from "../templates/login";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Confecção - Faça Login</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;

export const getServerSideProps = SSGWithGuestVerification(async () => {
  return { props: {} };
});
