import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background_secondary};
  padding-top: ${getStatusBarHeight() + 18}px;
`;


export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

`;


export const CarImages = styled.View`
  padding-top: ${getStatusBarHeight() + 30}px;
`;