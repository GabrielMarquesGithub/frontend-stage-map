import { keyframes } from "@chakra-ui/react";

type apearAnimationType = {
  milliseconds?: number | string;
  distance?: number | string;
  direction?: "right" | "left" | "top" | "bottom";
};

export default function apearAnimation({
  milliseconds = "500",
  distance = "200",
  direction = "bottom",
}: apearAnimationType) {
  let translateValue;
  switch (direction) {
    case "bottom":
      translateValue = `0, ${distance}px`;
      break;
    case "top":
      translateValue = `0, -${distance}px`;
      break;
    case "right":
      translateValue = `${distance}px, 0`;
      break;
    case "left":
      translateValue = `-${distance}px, 0`;
      break;
  }
  const animationKeyframes = keyframes`
  0% { transform: translate(${translateValue}); opacity: 0;}
  100% { transform: translate(0, 0); opacity: 1;}
`;
  return `${animationKeyframes} ${milliseconds}ms ease-in-out`;
}
