import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

import { theme } from "../styles/theme/theme";

import ErrorPage from "./_error";

import { AuthProvider } from "../Contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  let component: ReactNode;

  if (pageProps.errors) {
    component = <ErrorPage code={pageProps.errors} />;
  }

  if (!pageProps.errors) {
    component = <Component {...pageProps} />;
  }

  return (
    <>
      <AuthProvider>
        <ChakraProvider theme={theme}>{component}</ChakraProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
