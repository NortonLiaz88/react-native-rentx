import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import * as Yup from "yup";

import { Alert, KeyboardAvoidingView } from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";

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

export function FirstStep() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driverLicense, setDriverLicense] = useState("");

  const navigation = useNavigation<any>();

  async function handleNextStep() {
    try {
      const scheme = Yup.object().shape({
        name: Yup.string().required("Nome é obrigatório"),
        email: Yup.string()
          .email("E-mail é invalido")
          .required("E-mail é obrigatório"),
        driverLicense: Yup.string().required("CNH é obrigatória"),
      });

      const data = { name, email, driverLicense };
      await scheme.validate(data);

      navigation.navigate("SignUpSecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <Container>
        <Header>
          <BackButton />
          <Steps>
            <Bullet active />
            <Bullet active={false} />
          </Steps>
        </Header>

        <TitleWrapper>
          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>Faça seu cadastro de{"\n"}forma rápida e fácil.</SubTitle>
        </TitleWrapper>
        <Form>
          <FormSection>1. Dados</FormSection>
          <InputsWrapper>
            <Input
              iconName="user"
              placeholder="Nome"
              autoCorrect={false}
              value={name}
              onChangeText={setName}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              autoCorrect={false}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              autoCorrect={false}
              keyboardType="numeric"
              value={driverLicense}
              onChangeText={setDriverLicense}
            />
          </InputsWrapper>
        </Form>
        <Footer>
          <Button title="Proximo" onPress={handleNextStep} />
        </Footer>
      </Container>
    </KeyboardAvoidingView>
  );
}
