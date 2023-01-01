import { useContext } from "react";
import { Box, GridItem, Icon, Text, useBoolean } from "@chakra-ui/react";

import { BsFillTrashFill } from "react-icons/bs";

import { stageType } from "../../../types/ordered";
import { stageColor } from "../../../utils/project/enums/stageColor";

import { OrderedPageContext } from "../../../Contexts/OrderedPageContext";
import ErrorModal from "../../General/ErrorModal";
import buildCookiesActions from "../../../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../../../utils/fetch/authenticatedFetchFunction";

type StageModalItemType = {
  stage: Omit<stageType, "pivot">;
};

const StageModalItem = ({ stage }: StageModalItemType) => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //dados
  const { state, actions } = useContext(OrderedPageContext);
  const {
    pageStates: { editable, error, isLoading },
  } = state;

  //############### add stage action ###############
  const handleAddStage = async () =>
    actions?.addStage({
      ...stage,
      pivot: { status: "NOT_STARTED", observation: "" },
    });

  //############### delete action ###############
  const [errorDeleteModal, setErrorDeleteModal] = useBoolean(false);
  const handleDelete = async () => {
    if (!editable) return;
    if (error) actions?.closeError();
    actions?.isLoading();

    const url = process.env.NEXT_PUBLIC_BASE_URL + "/stage/" + stage.id;

    const res = await authenticatedFetchFunction(url, authToken, {
      method: "DELETE",
    });

    //lidando com possíveis erros na requisição
    if (res.status === 409) {
      setErrorDeleteModal.on();
    }
    if (res.errors) {
      actions?.notLoading();
      return actions?.displayError();
    }
    actions?.notLoading();
    return actions?.deleteStage(stage.id);
  };
  return (
    <>
      <ErrorModal
        isCentered
        onClose={setErrorDeleteModal.off}
        isOpen={errorDeleteModal}
        blockScrollOnMount={false}
        ErrorMessage=" Não é possível deletar esse estagio, ele ainda está associado a
            algum pedido"
      />

      <GridItem
        display="flex"
        gap="2"
        borderY="1.5px solid"
        py="1px"
        mx="10px"
        borderColor={stageColor.NOT_STARTED}
        _hover={{
          color: "pink.500",
          borderColor: "pink.500",
          transition: "color 0.2s",
          ".myItem": {
            bg: "pink.500",
            transition: "transform 0.4s",
            transform: "translate(+3%, 0%)",
          },
        }}
      >
        <Box
          cursor="pointer"
          className="myItem"
          fontWeight="bold"
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="70px"
          minW="130px"
          color="white"
          bg={stageColor.NOT_STARTED}
          clipPath="polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)"
          onClick={handleAddStage}
        >
          <Text
            maxW="70px"
            overflow="hidden"
            whiteSpace="nowrap"
            textOverflow="ellipsis"
            mr="-25px"
          >
            {stage.name}
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          w="full"
          p="10px"
        >
          <Box>
            <Text
              maxW="180px"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
            >
              Nome: {stage.name}
            </Text>
            <Text
              maxW="180px"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              mr="-25px"
            >
              Setor: {stage.sector}
            </Text>
          </Box>
          <Icon
            cursor="pointer"
            _hover={{
              transition: "transform 0.2s",
              transform: "scale(1.2)",
            }}
            as={BsFillTrashFill}
            onClick={handleDelete}
          />
        </Box>
      </GridItem>
    </>
  );
};

export default StageModalItem;
