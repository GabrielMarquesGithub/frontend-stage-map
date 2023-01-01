export type orderedType = {
  id: number;
  title: string;
  deadline: string;
  prediction: string;
  description: string;
  products: string;
  priority: "URGENT" | "HIGH" | "NORMAL" | "LOW" | "COMPLETE";
  created_at: string;
  updated_at: string;
  user_id: number;
  user: {
    id: number;
    name: string;
  };
  client: {
    id: number;
    name: string;
    email: string;
    fone: string;
  };
  images: {
    id: number;
    url: string;
  }[];
  stage: stageType[] | null;
};

// dados de uma stage individual
export type stageType = {
  id: number;
  name: string;
  sector: string;
  pivot: stagePivotType;
};
export type stagePivotType = {
  status: "STOPPED" | "COMPLETE" | "PROGRESS" | "NOT_STARTED";
  observation: string;
};

// dados dos cards
export type orderedCardType = Pick<
  orderedType,
  "id" | "title" | "deadline" | "priority" | "client" | "stage"
>;

// dados vindos da API
export type orderedCardDataType = {
  ordered: orderedCardType[];
  orderedQuantity: number;
};
