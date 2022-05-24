import { BorderlessButton } from "react-native-gesture-handler";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const HeaderTop = styled.View``;
export const LogoutButton = styled(BorderlessButton)``;
export const PhotoContainer = styled.View``;
export const Photo = styled.Image``;
