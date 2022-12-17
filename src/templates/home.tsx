import { Container } from "@chakra-ui/react";

import { orderedCardDataType } from "../types/ordered";

import apearAnimation from "../styles/animations/apearAnimation";

import DarkContainer from "../components/BodyStyle/DarkContainer";
import OrderedContainer from "../components/Dashboard/Ordered/OrderedContainer";

type HomeType = {
  ordered: orderedCardDataType;
};

const Home = ({ ordered }: HomeType) => {
  return (
    <Container as="main" maxW="container.lg" p="8">
      <DarkContainer animation={apearAnimation({ milliseconds: 600 })}>
        <OrderedContainer {...ordered} />
      </DarkContainer>
    </Container>
  );
};

export default Home;
