import { Avatar } from "@chakra-ui/react";

import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

const UserIcon = () => {
  const { user } = useContext(AuthContext);
  return (
    <Avatar boxSizing="content-box" border="2px solid" name={user?.name} />
  );
};

export default UserIcon;
