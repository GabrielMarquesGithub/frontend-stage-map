export type requestType<T> = {
  data: T | null;
  errors: Error | null;
  isLoading: boolean;
  status: number;
};

export default async function fetchFunction<T>(
  url: string,
  options?: RequestInit
): Promise<requestType<T>> {
  //default values
  let request: requestType<T> = {
    data: null,
    errors: null,
    isLoading: false,
    status: 200,
  };

  try {
    //carregando
    request.isLoading = true;

    //enviando solicitação
    const response = await fetch(url, options);

    //obtendo status
    request.status = response.status;

    //tratando possíveis erros na resposta
    if (response.status >= 400) {
      throw new Error(response.statusText);
    }

    request.data = await response.json();
  } catch (error) {
    //recuperando o erro
    request.errors = error as Error;
  } finally {
    //finalizado
    request.isLoading = false;
  }

  return request;
}
