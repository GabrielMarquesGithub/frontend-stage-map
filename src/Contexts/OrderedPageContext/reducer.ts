import { orderedDataType, stageDataType, stateType } from ".";
import { actionKind } from "./actionTypes";

export type actionType =
  | {
      type: actionKind.setOrderedData;
      payload: orderedDataType;
    }
  | {
      type: actionKind.setStageData;
      payload: stageDataType[];
    }
  | {
      type: actionKind.removeStage;
      payload: number;
    }
  | {
      type: actionKind.disableEditMode;
    }
  | {
      type: actionKind.activeEditMode;
    }
  | {
      type: actionKind.isLoading;
    }
  | {
      type: actionKind.notLoading;
    }
  | {
      type: actionKind.displayError;
    }
  | {
      type: actionKind.closeError;
    };

export function reducer(state: stateType, action: actionType) {
  switch (action.type) {
    case actionKind.setOrderedData:
      return {
        ...state,
        data: {
          ...state.data,
          ordered: action.payload,
        },
      };
    case actionKind.setStageData:
      return {
        ...state,
        data: {
          ...state.data,
          stage: action.payload,
        },
      };
    case actionKind.removeStage:
      return {
        ...state,
        data: {
          ...state.data,
          ordered: {
            ...state.data.ordered,
            stage: (state.data.ordered.stage ?? []).filter(
              (stage) => stage.id != action.payload
            ),
          },
        },
      };
    case actionKind.disableEditMode:
      return {
        ...state,
        pageStates: {
          ...state.pageStates,
          editable: false,
        },
      };
    case actionKind.activeEditMode:
      return {
        ...state,
        pageStates: {
          ...state.pageStates,
          editable: true,
        },
      };
    case actionKind.isLoading:
      return {
        ...state,
        pageStates: {
          ...state.pageStates,
          isLoading: true,
        },
      };
    case actionKind.notLoading:
      return {
        ...state,
        pageStates: {
          ...state.pageStates,
          isLoading: false,
        },
      };
    case actionKind.displayError:
      return {
        ...state,
        pageStates: {
          ...state.pageStates,
          error: true,
        },
      };
    case actionKind.closeError:
      return {
        ...state,
        pageStates: {
          ...state.pageStates,
          error: false,
        },
      };
    default:
      return { ...state };
  }
}
