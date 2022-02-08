import React from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Acessory as Accessory } from "../../components/Acessory";

import { getAccessoryIcons } from "../../utils/getAccessoryIcons";

import {
  CarImages,
  Container,
  Header,
  Content,
  Details,
  Descriptions,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories as Accessories,
  Footer,
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { car } = route.params! as Params;

  function handleConfirmRental() {
    navigation.navigate("Scheduling", {car});
  }

  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Descriptions>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Descriptions>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
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
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
}
