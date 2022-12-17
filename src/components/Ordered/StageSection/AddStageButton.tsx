import { Icon, IconButton, IconButtonProps } from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";

type AddStageButtonType = IconButtonProps;

const AddStageButton = ({ ...rest }: AddStageButtonType) => {
  return (
    <IconButton
      mr="-15px"
      h="70px"
      minW="130px"
      bg="pink.500"
      clipPath="polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%)"
      _hover={{
        ".myIcon": {
          transition: "transform 0.6s",
          transform: "rotate(180deg)",
        },
      }}
      icon={
        <Icon
          className="myIcon"
          transition="transform 0.5s 0.2s"
          fontSize="5xl"
          as={MdAdd}
        />
      }
      {...rest}
    />
  );
};

export default AddStageButton;
