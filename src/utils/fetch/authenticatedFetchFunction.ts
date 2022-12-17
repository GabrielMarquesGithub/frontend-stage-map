import baseFetchFunction from "./baseFetchFunction";

type requestType<T> = {
  data: T | null;
  errors: Error | null;
  isLoading: boolean;
  status: number;
};

//função para ser responsável por requisições autenticadas
export default async function authenticatedFetchFunction<T>(
  url: string,
  token: string,
  options?: RequestInit
): Promise<requestType<T>> {
  //atribuindo o token ao header
  const authenticatedHeader = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  options = Object.assign(authenticatedHeader, options);
  //chamando fetch
  const response = await baseFetchFunction<T>(url, options);

  return response;
}
