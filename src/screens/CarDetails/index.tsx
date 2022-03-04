import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory as Accessory } from "../../components/Acessory";

import { getAccessoryIcons } from "../../utils/getAccessoryIcons";

import {
  Container,
  Header,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
  AnimatedHeaderAndSlider,
  AnimatedCarImages,
  AnimatedContent,
} from "./styles";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { car } = route.params! as Params;

  const statusBarHeight = getStatusBarHeight();

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, statusBarHeight + 50],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  function handleConfirmRental() {
    navigation.navigate("Scheduling", { car });
  }

  return (
    <Container>
      <AnimatedHeaderAndSlider style={headerStyleAnimation}>
        <Header>
          <BackButton />
        </Header>

        <AnimatedCarImages style={sliderCarsStyleAnimation}>
          <ImageSlider imagesUrl={car.photos} />
        </AnimatedCarImages>
      </AnimatedHeaderAndSlider>

      <AnimatedContent onScroll={scrollHandler} scrollEventThrottle={16}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcons(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </AnimatedContent>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
