import { useContext } from "react";
import { UnorderedList, useBoolean } from "@chakra-ui/react";
import AddStageButton from "./AddStageButton";

import apearAnimation from "../../../styles/animations/apearAnimation";

import StageSectionItem from "./StageSectionItem";
import StageModal from "../StageModal/StageModal";

import { OrderedPageContext } from "../../../Contexts/OrderedPageContext";

const StageSectionContainer = () => {
  //dados
  const { state } = useContext(OrderedPageContext);
  const {
    pageStates: { editable, isLoading },
    data: {
      ordered: { stage },
    },
  } = state;

  //controle modal
  const [stageAddModalState, setStageAddModalState] = useBoolean(false);

  return (
    <>
      <StageModal
        isOpen={stageAddModalState}
        onClose={setStageAddModalState.off}
      />

      <UnorderedList
        display="flex"
        alignItems="center"
        marginInlineStart="0"
        overflow="auto"
        h="85px"
      >
        {stage?.map((stageItem) => (
          <StageSectionItem key={stageItem.id} stage={stageItem} />
        ))}

        {editable && (
          <AddStageButton
            isLoading={isLoading}
            aria-label="Adicionar Estagio"
            animation={apearAnimation({
              milliseconds: 200,
              direction: "right",
              distance: 50,
            })}
            onClick={setStageAddModalState.on}
          />
        )}
      </UnorderedList>
    </>
  );
};

export default StageSectionContainer;
