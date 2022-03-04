import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { FirstStep } from "../screens/SignUp/FirstStep";
import { SecondStep } from "../screens/SignUp/SecondStep";
import { Complete } from "../screens/Complete";

const { Navigator, Screen } = createNativeStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash}></Screen>
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={FirstStep} />
      <Screen name="SignUpSecondStep" component={SecondStep} />
      <Screen name="Complete" component={Complete} />
    </Navigator>
  );
}
