import React from "react";
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color, ...rest }: Props) {
  const theme = useTheme();
  const navigation = useNavigation();
  return (
    <Container {...rest} onPress={() => {navigation.goBack()}}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}
