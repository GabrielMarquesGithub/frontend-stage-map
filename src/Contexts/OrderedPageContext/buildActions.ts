import { orderedDataType, stageDataType, stateType } from ".";

import { actionKind } from "./actionTypes";
import { actionType } from "./reducer";

type dispatchType = (action: actionType) => void;

export const buildAction = (state: stateType, dispatch: dispatchType) => {
  return {
    setOrderedData: (payload: orderedDataType) =>
      dispatch({ type: actionKind.setOrderedData, payload: payload }),
    setStageData: (payload: stageDataType[]) =>
      dispatch({ type: actionKind.setStageData, payload: payload }),
    addStage: (payload: stageDataType) =>
      addStageFunction(payload, state.data.ordered, dispatch),
    removeStage: (payload: number) =>
      dispatch({ type: actionKind.removeStage, payload: payload }),
    updateOrderedStage: (payload: stageDataType) =>
      updateOrderedStageFunction(payload, state.data.ordered, dispatch),
    deleteStage: (payload: number) =>
      deleteStageFunction(payload, state.data.stage, dispatch),
    disableEditMode: () => dispatch({ type: actionKind.disableEditMode }),
    activeEditMode: () => dispatch({ type: actionKind.activeEditMode }),
    isLoading: () => dispatch({ type: actionKind.isLoading }),
    notLoading: () => dispatch({ type: actionKind.notLoading }),
    displayError: () => dispatch({ type: actionKind.displayError }),
    closeError: () => dispatch({ type: actionKind.closeError }),
  };
};

function addStageFunction(
  payload: stageDataType,
  orderedStage: orderedDataType,
  dispatch: dispatchType
) {
  const stage = orderedStage.stage ?? [];
  if (stage.some((stageItem) => stageItem.id === payload.id)) return;

  return dispatch({
    type: actionKind.setOrderedData,
    payload: { ...orderedStage, stage: [...stage, payload] },
  });
}

function deleteStageFunction(
  payload: number,
  stage: stageDataType[] | null,
  dispatch: dispatchType
) {
  stage = stage ?? [];
  stage = stage.filter((stageItem) => stageItem.id !== payload);
  return dispatch({
    type: actionKind.setStageData,
    payload: stage,
  });
}

function updateOrderedStageFunction(
  payload: stageDataType,
  orderedStage: orderedDataType,
  dispatch: dispatchType
) {
  const stage = orderedStage.stage ?? [];
  const stages = stage.map((stageItem) =>
    stageItem.id === payload.id ? payload : stageItem
  );
  return dispatch({
    type: actionKind.setOrderedData,
    payload: { ...orderedStage, stage: stages },
  });
}
