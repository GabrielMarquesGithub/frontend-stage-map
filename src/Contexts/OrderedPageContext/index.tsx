import { createContext, ReactNode, useReducer, Reducer, useMemo } from "react";

import { orderedType, stageType } from "../../types/ordered";

import dateTimeToDate from "../../utils/converters/dateTimeToDate";

//partes essenciais
import { buildAction } from "./buildActions";
import { actionType, reducer } from "./reducer";

//tipos globais do contexto
export type onlyOrderedDataType = Pick<
  orderedType,
  "title" | "prediction" | "deadline" | "description"
>;
export type orderedDataType = orderedType;
export type stageDataType = stageType;
export type stateType = {
  pageStates: {
    editable: boolean;
    isLoading: boolean;
    error: boolean;
  };
  data: {
    ordered: orderedDataType;
    stage: stageDataType[] | null;
  };
};

//tipagem das ações
type actionsType = {
  setOrderedData: (payload: orderedDataType) => void;
  setStageData: (payload: stageDataType[]) => void;
  addStage: (payload: stageType) => void;
  removeStage: (payload: number) => void;
  updateOrderedStage: (payload: stageType) => void;
  deleteStage: (payload: number) => void;
  disableEditMode: () => void;
  activeEditMode: () => void;
  isLoading: () => void;
  notLoading: () => void;
  displayError: () => void;
  closeError: () => void;
};

type OrderedPageContextType = {
  state: stateType;
  actions: actionsType | null;
};

const initialReducerValue: stateType = {
  pageStates: {
    editable: false,
    isLoading: false,
    error: false,
  },
  data: {
    stage: null,
    ordered: {
      id: 0,
      title: "",
      products: "",
      prediction: "",
      deadline: "",
      created_at: dateTimeToDate(new Date().toISOString()),
      updated_at: dateTimeToDate(new Date().toISOString()),
      description: "",
      priority: "NORMAL",
      user_id: 0,
      user: {
        id: 0,
        name: "",
      },
      client: {
        id: 0,
        name: "",
        fone: "",
        email: "",
      },
      images: [
        {
          id: 0,
          url: "",
        },
      ],
      stage: null,
    },
  },
};

export const OrderedPageContext = createContext<OrderedPageContextType>({
  state: initialReducerValue,
  actions: null,
});

type OrderedPageProviderType = {
  children: ReactNode;
  ordered?: orderedDataType;
  stage?: stageDataType[];
  editable?: boolean;
};

export const OrderedPageProvider = ({
  children,
  ordered,
  stage,
  editable = false,
}: OrderedPageProviderType) => {
  const [state, dispatch] = useReducer<Reducer<stateType, actionType>>(
    reducer,
    {
      data: {
        ...initialReducerValue.data,
        ordered: ordered ? ordered : initialReducerValue.data.ordered,
        stage: stage ? stage : initialReducerValue.data.stage,
      },
      pageStates: { ...initialReducerValue.pageStates, editable: editable },
    }
  );

  //useMemo para evitar re-criação das funções na memoria infinitamente
  const actions = useMemo(() => {
    return buildAction(state, dispatch);
  }, [state]);

  return (
    <OrderedPageContext.Provider value={{ state, actions }}>
      {children}
    </OrderedPageContext.Provider>
  );
};
