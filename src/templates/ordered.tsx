import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Container,
  Icon,
  IconButton,
  Heading,
  Grid,
  useBoolean,
  Alert,
  AlertIcon,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import { AiFillCloseSquare, AiFillHome } from "react-icons/ai";
import { MdEdit, MdSave } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import schema from "../components/Ordered/FormSection/FormSchema";

import { orderedType } from "../types/ordered";

import apearAnimation from "../styles/animations/apearAnimation";

import orderedTimeToDate from "../utils/project/converters/orderedTimeToDate";

import DarkBox from "../components/BodyStyle/DarkContainer";
import OrderedHeader from "../components/Ordered/OrderedHeader";
import StageSectionContainer from "../components/Ordered/StageSection/StageSectionContainer";
import ClientForm from "../components/Ordered/FormSection/ClientForm";
import OrderedForm from "../components/Ordered/FormSection/OrderedForm";
import MyLink from "../components/Link/MyLink";

import { OrderedPageContext } from "../Contexts/OrderedPageContext";
import ImageContainer from "../components/Ordered/ImageForm/ImageContainer";
import buildCookiesActions from "../utils/cookies/buildCookiesActions";
import authenticatedFetchFunction from "../utils/fetch/authenticatedFetchFunction";

const Ordered = () => {
  //manipulação de cookies
  const { getCookies } = buildCookiesActions(undefined);
  const authToken = getCookies("stageMap.auth.token");

  //desconstrução do contexto
  const { state, actions } = useContext(OrderedPageContext);
  //desconstrução dos dados
  const {
    pageStates: { editable, error, isLoading },
    data: { ordered },
  } = state;
  //definindo tipo de pagina
  const createPage = ordered.id > 0 ? false : true;

  //useRouter para trabalho de rotas
  const { push } = useRouter();

  //controle de formulário
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<orderedType>({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: ordered,
  });

  //############### edit action ###############
  const [tempData, setTempData] = useState(ordered);

  //logica para reset dos dados
  const handleEdit = () => {
    if (!editable) {
      actions?.activeEditMode();
      return setTempData(ordered);
    }
    actions?.disableEditMode();
    reset(tempData);
    return actions?.setOrderedData(tempData);
  };

  //############### save action ###############
  const handleSave = async (data: orderedType) => {
    actions?.isLoading();

    //só será salvo se estiver editável
    if (!editable) return;
    if (error) actions?.closeError();

    //definições para requisição
    type orderedJSONType = {
      data: orderedType;
    };

    //atualizando informação não vindas de forms no data
    data = { ...data, stage: ordered.stage, user_id: 1 };
    const url = createPage
      ? process.env.NEXT_PUBLIC_BASE_URL_ORDERED!
      : process.env.NEXT_PUBLIC_BASE_URL_ORDERED + "/" + ordered.id;
    const method = createPage ? "POST" : "PUT";
    const res = await authenticatedFetchFunction<orderedJSONType>(
      url,
      authToken,
      {
        method: method,
        body: JSON.stringify({ ...data, stage: ordered.stage, user_id: 1 }),
      }
    );

    //lidando com possíveis erros na requisição
    if (!res.data || !res.data.data || res.errors) {
      actions?.displayError();
      actions?.notLoading();
    } else {
      actions?.disableEditMode();
      //sentado o estado atual com o que foi retornado
      actions?.setOrderedData(orderedTimeToDate(res.data.data));

      actions?.notLoading();
      push("" + res.data.data.id);
    }
  };

  //############### delete action ###############
  const [deleteModalState, setDeleteModalState] = useBoolean(false);

  const handleDelete = async () => {
    actions?.isLoading();

    //em paginas de criação não é necessário delete
    if (createPage) return;
    if (error) actions?.closeError();

    const url = process.env.NEXT_PUBLIC_BASE_URL_ORDERED + "/" + ordered.id;

    const res = await authenticatedFetchFunction(url, authToken);

    //lidando com possíveis erros na requisição
    if (res.errors) {
      actions?.displayError();
      actions?.notLoading();
    } else {
      actions?.notLoading();
      push("/dashboard");
    }
  };

  //com o getServerSideProps realizando validação muito dificilmente está pagina sera iniciada sem dados
  return (
    <>
      <Modal
        isCentered
        isOpen={deleteModalState}
        onClose={setDeleteModalState.off}
      >
        <ModalOverlay />
        <ModalContent bgColor="gray.900">
          <ModalHeader textAlign="center" as="h2" textTransform="uppercase">
            Deletar Pedido?
          </ModalHeader>

          <ModalFooter justifyContent="center" gap="2">
            <Button
              isLoading={isLoading}
              minW="100px"
              bg="gray.600"
              _hover={{ bg: "gray.700" }}
              _active={{ bg: "gray.700" }}
              onClick={setDeleteModalState.off}
            >
              Cancelar
            </Button>
            <Button
              isLoading={isLoading}
              minW="100px"
              bg="red.500"
              _hover={{ bg: "red.600" }}
              _active={{ bg: "red.600" }}
              onClick={handleDelete}
            >
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Container as="main" maxW="container.lg" p="8">
        <OrderedHeader title={ordered.title} priority={ordered.priority}>
          {editable && (
            <IconButton
              isLoading={isLoading}
              animation={apearAnimation({
                milliseconds: 200,
                direction: "right",
                distance: 50,
              })}
              variant="icon"
              aria-label="Butão para Salvar"
              icon={<Icon as={MdSave} />}
              onClick={handleSubmit(handleSave)}
            />
          )}
          <IconButton
            isLoading={isLoading}
            variant="icon"
            aria-label="Butão para Editar"
            icon={<Icon as={editable ? AiFillCloseSquare : MdEdit} />}
            onClick={handleEdit}
          />
          {!createPage && (
            <IconButton
              isLoading={isLoading}
              variant="icon"
              aria-label="Butão para deletar"
              icon={<Icon as={BsFillTrashFill} />}
              onClick={setDeleteModalState.on}
            />
          )}
          <MyLink href="/dashboard">
            <IconButton
              isLoading={isLoading}
              variant="icon"
              aria-label="Butão ir para o home"
              icon={<Icon as={AiFillHome} />}
            />
          </MyLink>
        </OrderedHeader>

        {error && (
          <Alert
            status="error"
            mt="3"
            position="fixed"
            w="400px"
            right="10px"
            bottom="10px"
            zIndex="9999"
          >
            <AlertIcon color="white" />
            Erro ao enviar requisição
            <CloseButton
              position="absolute"
              right="1"
              onClick={actions?.closeError}
            />
          </Alert>
        )}

        <DarkBox
          animation={apearAnimation({ milliseconds: 400 })}
          mt="3"
          borderRadius="md"
        >
          <StageSectionContainer />
        </DarkBox>

        <Grid
          animation={apearAnimation({ milliseconds: 600 })}
          mt="3"
          gridTemplateColumns="60% 38%"
          justifyContent="space-between"
          gap="2%"
        >
          <DarkBox borderRadius="md">
            <Heading as="h3" fontSize="2xl" mb="5">
              Cliente
            </Heading>
            <ClientForm
              disabled={!editable || isLoading}
              errors={errors}
              register={register}
            />
          </DarkBox>
          <DarkBox borderRadius="md">
            <ImageContainer />
          </DarkBox>
        </Grid>

        <DarkBox
          animation={apearAnimation({ milliseconds: 800 })}
          mt="3"
          borderRadius="md"
        >
          <Heading as="h3" fontSize="2xl" mb="5">
            Pedido
          </Heading>
          <OrderedForm
            disabled={!editable || isLoading}
            errors={errors}
            register={register}
          />
        </DarkBox>
      </Container>
    </>
  );
};

export default Ordered;
