import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { AntDesign } from "@expo/vector-icons";

import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import theme from "../../styles/theme";

import {
  Container,
  Header,
  Subtitle,
  Title,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import AppLoading from "expo-app-loading";
import { Load } from "../../components/Load";

interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const navigation = useNavigation();

  async function fetchCars() {
    try {
      const response = await api.get("./schedules_byuser?user_id=1");
      setCars(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <BackButton color={theme.colors.shape} />
        <Title>
          Seus agendamentos,{`\n`}
          estão aqui.
        </Title>
        <Subtitle>Conforto, segurança e praticidade.</Subtitle>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <Content>
          <Appointments>
            <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
            <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
          </Appointments>

          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CarWrapper>
                <Car data={item.car}></Car>
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate>{item.startDate}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{ marginHorizontal: 10 }}
                    />
                    <CarFooterDate>{item.endDate}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        </Content>
      )}
    </Container>
  );
}
