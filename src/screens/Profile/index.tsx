import React from "react";
import { useNavigation } from "@react-navigation/core";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import { BackButton } from "../../components/BackButton";

import {
  Container,
  Header,
  HeaderTop,
  LogoutButton,
  PhotoContainer,
  Photo,
} from "./styles";

export function Profile() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  function handleSingOut() {
    navigation.goBack();
  }

  return (
    <Container>
      <Header>
        <HeaderTop>
          <BackButton color={theme.colors.shape} onPress={handleBack} />
          <LogoutButton onPress={handleSingOut}>
            <Feather name="power" color={theme.colors.shape} />
          </LogoutButton>
        </HeaderTop>

        <PhotoContainer>
          <Photo
            source={{
              uri: "https://avatars.githubusercontent.com/u/62452151?v=4",
            }}
          />
        </PhotoContainer>
      </Header>
    </Container>
  );
}
