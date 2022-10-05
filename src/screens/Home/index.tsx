import React, { useEffect, useState } from "react";
import { Button, StatusBar, StyleSheet, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { Ionicons } from "@expo/vector-icons";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {useNetInfo} from '@react-native-community/netinfo';
import {synchronize} from '@nozbe/watermelondb/sync';
import { database } from "../../database";
import {Car as ModelCar} from '../../database/model/Car';


const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import { Car } from "../../components/Car";
import { Load } from "../../components/Load";

import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import {
  CarList,
  Container,
  Header,
  HeaderContent,
  TotalCars,
  MyCars,
} from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";
import { LoadAnimation } from "../../components/LoadAnimation";

export function Home() {
  const [cars, setCars] = useState<ModelCar[]>([]);
  const [loading, setLoading] = useState(true);

  const netInfo = useNetInfo();
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event) {
      positionX.value = event.translationX;
      positionY.value = event.translationY;
    },
    onEnd(event) {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

  const navigation = useNavigation<any>();
  const theme = useTheme();

  function handleCarDetails(car: ModelCar) {
    console.log("Rapaz");
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const carCollection = database.get<ModelCar>('cars');
        const cars = await carCollection.query().fetch();
        if (isMounted) {
          setCars(cars);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    
    const loadData = async () => {
      try {
        await offlineSynchronize();
      }
      catch(err) {
        console.log('Error',err)
      }
    };
    if(netInfo.isConnected) {
      console.log(netInfo.isConnected);
      loadData();
    }
    
  }, [netInfo.isConnected])
  

 async function offlineSynchronize() {
  await synchronize({
    database,
    pullChanges: async ({lastPulledAt}) => {
      const response = await api.get(
        `cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`
      );
      const { changes, latestVersion } = response.data;
      return { changes, timestamp: latestVersion}
    }, pushChanges: async ({changes}) => {
      const user = changes.users;
      await api.post('./users/sync', user);
    }
  });
 }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return true;
    });
  });

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
          <TotalCars>
            {loading ? `Buscando carros...` : `Total de ${cars.length} carros`}
          </TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <LoadAnimation />
      ) : (
        // <Load />
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 },
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            ></Ionicons>
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
