import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";

import { MyCars } from "../screens/MyCars";

import HomeSvg from "../assets/home.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";

import { StackRoutes } from "./app.stack.routes";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useTheme } from "styled-components";
import { Platform } from "react-native";

const { Navigator, Screen } = createBottomTabNavigator();

export function TabRoutes() {
  const theme = useTheme();
  return (
    <Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.main,
      tabBarInactiveTintColor: theme.colors.text,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 88,
        paddingVertical: Platform.OS === "ios" ? 20 : 0,
      },
    }}
      // screenOptions={{
      //   tabBarActiveTintColor: theme.colors.main,
      //   tabBarInactiveTintColor: theme.colors.text_detail,
      //   headerShown: false,
      //   tabBarShowLabel: false,
      //   tabBarStyle: {
      //     paddingVertical: getBottomSpace(),
      //     height: 78,
      //     backgroundColor: theme.colors.background_primary,
      //   },
      // }}
    >
      <Screen
        name="Home"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />

      <Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({  color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
