import { FlatList, FlatListProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Car } from "../../database/model/Car";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family:  ${({ theme }) => theme.fonts.primary_400};
  color: ${({ theme }) => theme.colors.text};
`;


// export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
//   contentContainerStyle: {
//     padding: 24,
//   },
//   showsVerticalScrollIndicator: false
// })``;


export const CarList = styled(
  FlatList as new (
    props: FlatListProps<Car>
  ) => FlatList<Car>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { width: "100%", padding: 24 },
})``;

export const MyCars = styled(RectButton)`
  width: 46px;
  height: 46px;

  justify-content: center;
  align-items: center;
  
  background-color: ${({theme}) => theme.colors.main};
  border-radius: 30px;
  
  position: absolute;
  right: 10px;
  bottom: 13px;

`;