import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";

import createButtonArray from "./createButtonArray";

type PaginationType = {
  itemsQuantity: number;
  itemsPerPage?: number;
  pageRangeDisplayed?: number;
};

const Pagination = ({
  itemsQuantity,
  itemsPerPage = 11,
  pageRangeDisplayed = 3,
}: PaginationType) => {
  //definindo quantidade de paginas
  const pages = Math.ceil(itemsQuantity / itemsPerPage);

  const router = useRouter();
  const [pageIndex, setPageIndex] = useState(1);

  //altera o index da pagina
  const handlePageIndex = async (value: number) => {
    if (value == pageIndex) return;
    setPageIndex(value);
    changeCurrentPage(value);
    //move tela para o topo da pagina
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  //cria e redireciona para uma nova Url
  const changeCurrentPage = (pageNumber: number) => {
    const path = router.pathname;
    const query = router.query;
    query.page = pageNumber.toString();
    router.push({
      pathname: path,
      query: query,
    });
  };
  //criando e limitando um array de botões para exibição
  const buttonsArray = createButtonArray(pages, pageIndex, pageRangeDisplayed);

  //obtendo dados para atualização via Url
  useEffect(() => {
    const page = router.query.page;
    setPageIndex(page ? Number(page) : 1);
  }, [router.pathname, router.query]);

  //para exibição de números
  const initialQuantityInPage = (pageIndex - 1) * itemsPerPage;
  const finalQuantityInPage =
    pageIndex * itemsPerPage >= itemsQuantity
      ? itemsQuantity
      : pageIndex * itemsPerPage;

  return (
    <Flex
      userSelect="none"
      alignItems="center"
      flexDirection={["column", "row"]}
      justifyContent="space-between"
      color="gray.500"
      py="2"
      px="4"
    >
      <Box>
        {initialQuantityInPage} - {finalQuantityInPage} de {itemsQuantity}
      </Box>
      <Flex gap="0.5">
        {buttonsArray.map((button) => (
          <Flex
            color="white"
            bg={pageIndex === button ? "pink.500" : "gray.700"}
            borderRadius="sm"
            w="10"
            h="10"
            alignItems="center"
            justifyContent="center"
            cursor="pointer"
            transition="all 0.2s"
            _hover={{
              bg: "pink.500",
              color: "white",
            }}
            onClick={() => handlePageIndex(button)}
            key={button}
          >
            {button}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default Pagination;
