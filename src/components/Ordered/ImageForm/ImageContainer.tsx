import { useContext, useRef } from "react";
import {
  Box,
  Button,
  FormLabel,
  Icon,
  IconButton,
  Input,
} from "@chakra-ui/react";

import { BsFileImageFill } from "react-icons/bs";

import fetchFunction from "../../../utils/fetch/fetchFunction";

import { OrderedPageContext } from "../../../Contexts/OrderedPageContext";

const ImageContainer = () => {
  //desconstrução do contexto
  const { state, actions } = useContext(OrderedPageContext);
  //desconstrução dos dados
  const {
    pageStates: { editable, error, isLoading },
    data: { ordered },
  } = state;

  const FileInput = useRef<HTMLInputElement>(null);

  //############### save action ###############
  const handleSave = async () => {
    //só será salvo se estiver editável
    if (!editable) return;
    if (
      !FileInput.current ||
      !FileInput.current.files ||
      !FileInput.current.files[0]
    )
      return;

    if (error) actions?.closeError();
    actions?.isLoading();

    const url = process.env.NEXT_PUBLIC_BASE_URL_IMAGE! + "/" + ordered.id;
    const method = "POST";

    const data = FileInput.current.files[0];

    console.log(data);

    const res = await fetchFunction(url, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      credentials: "same-origin",
      method: method,
      body: data,
    });

    //lidando com possíveis erros na requisição
    if (res.errors) {
      actions?.displayError();
    } else {
      actions?.disableEditMode();
    }
    actions?.notLoading();
  };

  return (
    <Box display="flex" alignItems="flex-end" h="full">
      <Button
        isLoading={isLoading}
        w="full"
        _hover={{ bg: "pink.600" }}
        _active={{ bg: "pink.600" }}
        bg="pink.500"
        color="gray.900"
        type="button"
        onClick={handleSave}
      >
        Enviar
      </Button>
      <FormLabel cursor="pointer" m="0">
        <IconButton
          bg="0"
          color="pink.500"
          _hover={{ color: "pink.600" }}
          _active={{ color: "pink.600" }}
          aria-label="Butão para adicionar uma imagem"
          as={BsFileImageFill}
        />
        <Input display="none" ref={FileInput} type="file"></Input>
      </FormLabel>
    </Box>
  );
};

export default ImageContainer;
