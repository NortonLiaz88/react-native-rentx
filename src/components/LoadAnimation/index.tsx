import React from "react";
import LottieView from "lottie-react-native";

import { Container } from "./styles";
import loadingCar from "../../assets/loadingAnimation.json";

export function LoadAnimation() {
  return (
    <Container>
      <LottieView
        source={loadingCar}
        autoPlay
        style={{ height: 200 }}
        loop
      ></LottieView>
    </Container>
  );
}
