import React from "react";

import {
  ImageIndexes,
  ImageIndex,
  CarImageWrapper,
  CarImage,
  Container,
} from "./styles";

interface Props {
  imagesUrl: string[];
}

export function ImageSlider({ imagesUrl }: Props) {
  return (
    <Container>
      <ImageIndexes>
        <ImageIndex active={true} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />
        <ImageIndex active={false} />

        
      </ImageIndexes>
      <CarImageWrapper>
          <CarImage
            source={{
              uri: "https://img1.gratispng.com/20180509/ocq/kisspng-chevrolet-celta-chevrolet-prisma-chevrolet-corsa-g-5af2c0514a0508.3939154215258583853032.jpg",
            }}
            resizeMode="contain"
          />
        </CarImageWrapper>
    </Container>
  );
}
