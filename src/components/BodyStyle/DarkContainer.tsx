import { Box, BoxProps } from "@chakra-ui/react";

type DarkBoxType = BoxProps;

const DarkBox = ({ children, ...rest }: DarkBoxType) => {
  return (
    <Box as="section" bg="gray.900" p="3" borderRadius="xl" {...rest}>
      {children}
    </Box>
  );
};

export default DarkBox;
