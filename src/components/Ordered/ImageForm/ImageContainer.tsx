import { useContext, useRef, useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Grid,
  GridItem,
  IconButton,
  Input,
} from "@chakra-ui/react";

import { BsFileImageFill } from "react-icons/bs";

import { OrderedPageContext } from "../../../Contexts/OrderedPageContext";

import buildCookiesActions from "../../../utils/cookies/buildCookiesActions";
import fetchFunction from "../../../utils/fetch/fetchFunction";
import ImageItem from "./ImageItem";
import apearAnimation from "../../../styles/animations/apearAnimation";

const ImageContainer = () => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //desconstrução do contexto
  const { state, actions } = useContext(OrderedPageContext);
  //desconstrução dos dados
  const {
    pageStates: { editable, error, isLoading },
    data: {
      ordered: { id, images },
    },
  } = state;

  //estado dos items do componente
  const [imagesState, setImagesState] = useState(images);

  const storageURL = process.env.NEXT_PUBLIC_BASE_URL_IMAGE;

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

    const url = process.env.NEXT_PUBLIC_BASE_URL + "/image/" + id;
    const method = "POST";

    const data = new FormData();

    data.append(
      "image",
      FileInput.current.files[0],
      FileInput.current.files[0].name
    );

    type imageJSONType = {
      data: {
        image: {
          id: number;
          url: string;
        }[];
      };
    };

    const res = await fetchFunction<imageJSONType>(url, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
      method: method,
      body: data,
    });

    //lidando com possíveis erros na requisição
    if (
      res.errors ||
      !res.data ||
      !res.data.data ||
      !res.data.data.image ||
      !res.data.data.image[0]
    ) {
      actions?.displayError();
    } else {
      setImagesState([...imagesState, res.data.data.image[0]]);
    }
    actions?.notLoading();
  };

  //############### delete action ###############
  const handleDelete = (id: number) => {
    setImagesState(imagesState.filter((img) => img.id !== id));
  };

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      maxH="250px"
      h="100%"
    >
      <Grid
        gridTemplateColumns="1fr 1fr 1fr"
        overflow="auto"
        justifyContent="space-between"
        gap="1"
      >
        {imagesState?.map((img) => (
          <ImageItem
            key={img.id}
            id={img.id}
            url={storageURL + "/" + img.url}
            deleteImageOnState={handleDelete}
          />
        ))}
      </Grid>
      {editable && (
        <Flex
          animation={apearAnimation({ distance: 10 })}
          mt="3"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
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
        </Flex>
      )}
    </Flex>
  );
};

export default ImageContainer;
