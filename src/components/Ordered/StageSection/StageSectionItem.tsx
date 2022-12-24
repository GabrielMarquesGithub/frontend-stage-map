import { useContext, useState } from "react";
import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";

import { stageType } from "../../../types/ordered";
import { stageColor } from "../../../utils/project/enums/stageColor";

import Textarea from "../../Form/Textarea";

import { OrderedPageContext } from "../../../Contexts/OrderedPageContext";
import buildCookiesActions from "../../../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../../../utils/fetch/authenticatedFetchFunction";

type StageSectionItemType = {
  stage: stageType;
};

const StageSectionItem = ({ stage }: StageSectionItemType) => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  const {
    id,
    name,
    pivot: { status, observation },
  } = stage;
  const { state, actions } = useContext(OrderedPageContext);
  const {
    pageStates: { editable, error, isLoading },
    data: {
      ordered: { id: ordered_id },
    },
  } = state;

  //temp data
  const [tempStage, setTempStage] = useState({
    ...stage,
    pivot: { ...stage.pivot, ordered_id, stage_id: stage.id },
  });

  //############### remove stage action ###############
  const handleRemoveStage = () => actions?.removeStage(id);

  //############### update stage action ###############
  const handleChangeCheck = (status: string) => {
    setTempStage({
      ...tempStage,
      pivot: {
        ...tempStage.pivot,
        status: status as "STOPPED" | "COMPLETE" | "PROGRESS" | "NOT_STARTED",
      },
    });
  };
  const handleChangeObservation = (observation: string) => {
    setTempStage({
      ...tempStage,
      pivot: {
        ...tempStage.pivot,
        observation: observation,
      },
    });
  };
  const handleUpdateStage = async () => {
    if (error) actions?.closeError();
    actions?.isLoading();

    //atualizando informação não vindas de forms no data
    const data = tempStage;

    const url = process.env.NEXT_PUBLIC_BASE_URL + "/pivot";
    const res = await authenticatedFetchFunction(url, authToken, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    //lidando com possíveis erros na requisição
    if (res.status >= 400 || res.errors) {
      actions?.displayError();
    } else {
      setStageModalState.off();
      actions?.updateOrderedStage(tempStage);
    }
    actions?.notLoading();
  };

  //controle modal
  const [stageModalState, setStageModalState] = useBoolean(false);

  return (
    <>
      <Modal
        isCentered
        isOpen={stageModalState}
        onClose={setStageModalState.off}
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.900">
          <ModalCloseButton />
          <ModalHeader textAlign="center" as="h2" textTransform="uppercase">
            {name}
          </ModalHeader>
          {!editable && (
            <ModalBody
              w="full"
              display="grid"
              gridTemplateColumns="35% 60%"
              justifyContent="space-between"
            >
              <RadioGroup
                colorScheme="pink"
                defaultValue={status}
                onChange={handleChangeCheck}
              >
                <Stack display="flex" gap="2" justifyContent="center" h="full">
                  <Radio value="NOT_STARTED">Não Iniciado</Radio>
                  <Radio value="PROGRESS">Em Progresso</Radio>
                  <Radio value="COMPLETE">Concluído</Radio>
                  <Radio value="STOPPED" colorScheme="red">
                    Parado
                  </Radio>
                </Stack>
              </RadioGroup>
              <Textarea
                onChange={(e) => handleChangeObservation(e.target.value)}
                defaultValue={observation}
                name="Observation"
              />
            </ModalBody>
          )}

          <ModalFooter justifyContent="center" gap="2">
            {editable && (
              <Button
                isLoading={isLoading}
                minW="full"
                bg="red.500"
                _hover={{ bg: "red.600" }}
                onClick={handleRemoveStage}
              >
                Excluir
              </Button>
            )}
            {!editable && (
              <Button
                isLoading={isLoading}
                w="full"
                bg="pink.500"
                _hover={{ bg: "pink.600" }}
                onClick={handleUpdateStage}
              >
                Atualizar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ListItem
        display="flex"
        justifyContent="center"
        alignItems="center"
        mr="-24px"
        h="70px"
        w="130px"
        minW="130px"
        color="white"
        bg={stageColor[status]}
        clipPath="polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)"
        cursor="pointer"
        fontWeight="bold"
        _hover={{
          transition: "transform 0.2s",
          transform: "translate(+2%, 0%)",
        }}
        onClick={setStageModalState.on}
      >
        <Text
          maxW="70px"
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          mr="-25px"
        >
          {name}
        </Text>
      </ListItem>
    </>
  );
};

export default StageSectionItem;
