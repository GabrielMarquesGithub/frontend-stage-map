export type userType = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export type UsersDataType = {
  users: userType[];
};
