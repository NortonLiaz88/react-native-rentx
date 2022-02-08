import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import Animated,{
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import BrandSvg from "../../assets/brand.svg";
import LogoSvg from "../../assets/logo.svg";

import { Container } from "./styles";

export function Splash() {
  const splashAnimation = useSharedValue(0);
  const navigation = useNavigation<any>();
  
  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0, 0.3, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP
          )
        }
      ]
    }
  });

  function startApp() {
    // let screenToGo;

    // if (user.id) {
    //   screenToGo = 'Home'
    // } else {
    //   screenToGo = 'SignIn'
    // }

    // console.log(screenToGo);

    navigation.navigate('Home');
  }

  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { duration: 1000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    )
  }, [])

  return (
    <Container>
      <Animated.View style={[{position: "absolute"}, brandStyle]}>
        <BrandSvg width={80} height={50} />
      </Animated.View>

      <Animated.View style={[{position: "absolute"}, logoStyle]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}