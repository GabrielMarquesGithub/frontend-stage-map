export type orderedType = {
  id: number;
  title: string;
  deadline: string;
  prediction: string;
  description: string;
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
  image: {
    id: number;
    url: string;
    title: string;
  }[];
  stage: stageType[] | null;
};

// dados de uma stage individual
export type stageType = {
  id: number;
  name: string;
  pivot: stagePivotType;
};
export type stagePivotType = {
  status: "STOPPED" | "COMPLETE" | "PROGRESS" | "NOT_STARTED";
  observation: string;
};

// dados dos cards
export type orderedCardType = Pick<
  orderedType,
  "id" | "title" | "deadline" | "priority" | "client"
>;

// dados vindos da API
export type orderedCardDataType = {
  ordered: orderedCardType[];
  orderedQuantity: number;
};
