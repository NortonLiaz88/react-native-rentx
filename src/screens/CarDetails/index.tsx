import React from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";

import { CarImages, Container, Header } from "./styles";

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton />
      </Header>

      <CarImages>
      <ImageSlider
        imagesUrl={[
          "https://img1.gratispng.com/20180509/ocq/kisspng-chevrolet-celta-chevrolet-prisma-chevrolet-corsa-g-5af2c0514a0508.3939154215258583853032.jpg",
        ]}
      />
      </CarImages>
      
    </Container>
  );
}
