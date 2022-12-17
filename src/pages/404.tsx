import { ErrorsCodes } from "../utils/project/enums/errorsCodes";

import ErrorPage from "./_error";

const FourOhFour = () => {
  return <ErrorPage code={ErrorsCodes.NOT_FOUND} />;
};

export default FourOhFour;
