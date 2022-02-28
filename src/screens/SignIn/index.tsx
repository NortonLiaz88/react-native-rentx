import React, { useState } from "react";
import * as Yup from "yup";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from "react-native";
import { useTheme } from "styled-components";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";

import { Container, Footer, Header, Form, SubTitle, Title } from "./styles";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<any>();

  async function handleSignIn() {
    const scheme = Yup.object().shape({
      email: Yup.string()
        .required("Email obrigatório")
        .email("Digite um email válido"),
      password: Yup.string().required("Senha é obrigatória"),
    });

    try {
      await scheme.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      } else {
        return Alert.alert("Erro na autenticação", "Verifique as credenciais");
      }
    }
  }

  function handleCreateAccount() {
    console.log("Navigation");
    navigation.navigate("SignUpFirstStep");
  }
  const theme = useTheme();
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <Container>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor="transparent"
          translucent
        ></StatusBar>
        <Header>
          <Title>Estamos {"\n"}quase lá.</Title>
          <SubTitle>
            Faça seu login para começar {"\n"} uma experiência incrível.
          </SubTitle>
        </Header>
        <Form>
          <Input
            iconName="mail"
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />
          <PasswordInput
            iconName="lock"
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
          />
        </Form>
        <Footer>
          <Button
            title="Login"
            enabled={false}
            loading={false}
            onPress={() => handleSignIn()}
          />
          <Button
            title="Criar conta gratuita"
            color={theme.colors.background_secondary}
            enabled={true}
            light
            onPress={() => handleCreateAccount()}
          />
        </Footer>
      </Container>
      {/* </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
}
