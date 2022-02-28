import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView } from "react-native";
import { useTheme } from "styled-components";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { PasswordInput } from "../../../components/PasswordInput";

import {
  Container,
  Header,
  Steps,
  TitleWrapper,
  Title,
  SubTitle,
  Form,
  FormSection,
  InputsWrapper,
  Footer,
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SecondStep() {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation<any>();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = route.params as Params;

  function handleRegister() {
    if (!password || !confirmPassword) {
      return Alert.alert("Informe a senha e a confirmação");
    }

    if (password !== confirmPassword) {
      return Alert.alert("As senhas não são iguais");
    }

    navigation.navigate("Complete", {
      title: `Conta\nCriada!`,
      message: `Agora é só fazer login\ne aproveitar`,
      nextScreenRoute: "SignIn",
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <Container>
        <Header>
          <BackButton />
          <Steps>
            <Bullet active={false} />
            <Bullet active />
          </Steps>
        </Header>
        <TitleWrapper>
          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil.</SubTitle>
        </TitleWrapper>
        <Form>
          <FormSection>2. Dados</FormSection>
          <InputsWrapper>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Confirmar senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </InputsWrapper>
        </Form>
        <Footer>
          <Button
            color={theme.colors.success}
            title="Cadastrar"
            onPress={handleRegister}
          />
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
}
