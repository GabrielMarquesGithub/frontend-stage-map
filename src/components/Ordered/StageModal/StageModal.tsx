import { useContext, useRef } from "react";
import {
  Button,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";

import Input from "../../Form/Input";
import StageModalItem from "./StageModalItem";

import { OrderedPageContext } from "../../../Contexts/OrderedPageContext";
import { stageType } from "../../../types/ordered";
import buildCookiesActions from "../../../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../../../utils/fetch/authenticatedFetchFunction";

type StageModalType = Pick<ModalProps, "isOpen" | "onClose">;

const StageModal = ({ ...rest }: StageModalType) => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //dados
  const { state, actions } = useContext(OrderedPageContext);
  const {
    data: { stage },
    pageStates: { editable, error, isLoading },
  } = state;

  //############### create action ###############
  const textInput = useRef<HTMLInputElement>(null);
  const handleCreate = async () => {
    if (!editable) return;
    if (!textInput.current) return;
    if (!textInput.current.value) return;
    if (error) actions?.closeError();
    actions?.isLoading();

    const url = process.env.NEXT_PUBLIC_BASE_URL + "/stage";

    const data = { name: textInput.current.value ?? "" };
    //definições para requisição
    type stageJSONType = {
      data: stageType;
    };

    const res = await authenticatedFetchFunction<stageJSONType>(
      url,
      authToken,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    //lidando com possíveis erros na requisição
    if (!res.data || !res.data.data || res.errors) {
      actions?.displayError();
      actions?.notLoading();
    } else {
      actions?.setStageData([...(stage ?? []), res.data.data]);
      textInput.current.value = "";
      actions?.notLoading();
    }
  };

  return (
    <Modal isCentered {...rest}>
      <ModalOverlay />
      <ModalContent bgColor="gray.900">
        <ModalCloseButton />
        <ModalHeader
          textAlign="center"
          as="h2"
          textTransform="uppercase"
          p="0"
          m="15px"
        >
          Estágios
        </ModalHeader>
        <ModalBody p="5px" mx="15px">
          <Grid
            overflow="auto"
            maxH="320px"
            display="grid"
            templateColumns="full"
            gap="1"
            alignItems="center"
            marginInlineStart="0"
          >
            {stage?.map((stageItem) => (
              <StageModalItem key={stageItem.id} stage={stageItem} />
            ))}
          </Grid>
        </ModalBody>
        <ModalFooter display="flex" gap="2" p="0" m="15px">
          <Input
            isDisabled={isLoading}
            ref={textInput}
            name="stageName"
            type="text"
            placeholder="Nome do stage"
          />
          <Button
            isLoading={isLoading}
            bg="pink.500"
            _hover={{ bg: "pink.600" }}
            onClick={handleCreate}
          >
            Add Estagio
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StageModal;
