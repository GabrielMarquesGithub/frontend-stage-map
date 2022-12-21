import { useContext } from "react";
import Image from "next/image";

import {
  Button,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
} from "@chakra-ui/react";

import buildCookiesActions from "../../../utils/cookies/buildCookiesActions";

import { OrderedPageContext } from "../../../Contexts/OrderedPageContext";
import authenticatedFetchFunction from "../../../utils/fetch/authenticatedFetchFunction";

type ImageItem = {
  id: number;
  url: string;
  deleteImageOnState: (id: number) => void;
};

const ImageItem = ({ url, id, deleteImageOnState }: ImageItem) => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //desconstrução do contexto
  const { state, actions } = useContext(OrderedPageContext);
  //desconstrução dos dados
  const {
    pageStates: { editable, error, isLoading },
  } = state;

  //############### save action ###############
  const handleDelete = async () => {
    //só será salvo se estiver editável
    if (!editable) return;

    if (error) actions?.closeError();
    actions?.isLoading();

    const url = process.env.NEXT_PUBLIC_BASE_URL + "/image/" + id;
    const method = "DELETE";

    const res = await authenticatedFetchFunction(url, authToken, { method });

    //lidando com possíveis erros na requisição
    if (res.errors) {
      actions?.displayError();
    } else {
      setUserModalState.off();
      deleteImageOnState(id);
    }
    actions?.notLoading();
  };

  //controle modal
  const [userModalState, setUserModalState] = useBoolean(false);
  return (
    <>
      <Modal isCentered isOpen={userModalState} onClose={setUserModalState.off}>
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
            Imagem
          </ModalHeader>
          <ModalBody
            position="relative"
            p="5px"
            mx="15px"
            minH="400px"
            maxH="400px"
            overflow="auto"
          >
            <Image layout="fill" objectFit="contain" alt="Image" src={url} />
          </ModalBody>
          <ModalFooter display="flex" gap="2" p="0" m="15px">
            {editable && (
              <Button
                isLoading={isLoading}
                colorScheme="pink"
                w="100%"
                onClick={handleDelete}
              >
                Deletar imagem
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <GridItem cursor="pointer" onClick={setUserModalState.on}>
        <Image width="100px" height="100px" alt="Image" src={url} />
      </GridItem>
    </>
  );
};

export default ImageItem;
