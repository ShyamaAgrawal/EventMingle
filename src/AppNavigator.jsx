import { View, Text, StatusBar } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./auth/LoginScreen";
import SignUpScreen from "./auth/SignUpScreen";
import Parent from "./Normal/Parent";
import LoadingScreen from "./auth/LoadingScreen";
import { gStyle } from "../GlobalStyles";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar animated={true} backgroundColor={gStyle.pc} barStyle='light-content' />
      <Stack.Navigator initialRouteName="loading" screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="loading" component={LoadingScreen} />
        <Stack.Screen name="parent" component={Parent} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="signup" component={SignUpScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
