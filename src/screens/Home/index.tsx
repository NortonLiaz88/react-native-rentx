import React from "react";
import { StatusBar } from "react-native";
import { CarList, Container, Header, HeaderContent, TotalCars } from "./styles";

import Logo from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { Car } from "../../components/Car";

export function Home() {
  const carData = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
        period: 'Ao dia',
        price: 120,
    },
    thumbnail: 'https://img1.gratispng.com/20180509/ocq/kisspng-chevrolet-celta-chevrolet-prisma-chevrolet-corsa-g-5af2c0514a0508.3939154215258583853032.jpg'
  }
  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
      <CarList
        data={[1,2,3,4,5,6,7]}
        keyExtractor={item => String(item)}
        renderItem={({item}) =>  <Car data={carData}/>}
      />

      
    </Container>
  );
}
