import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import Main from './Main';
import Temp from './Temp';
import LoginScreen from '../auth/LoginScreen';
import SignUpScreen from '../auth/SignUpScreen';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import CustomDrawer from './CustomDrawer';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName='Main' drawerContent={props => <CustomDrawer {...props} />} screenOptions={{
      drawerStyle: {
        width: responsiveWidth(80),
      },
    }}>
      <Drawer.Screen name="main" options={{ headerShown: false }} component={Main} />
      <Drawer.Screen name="temp" options={{ headerShown: false }} component={Temp} />
      <Drawer.Screen name="login" options={{ headerShown: false }} component={LoginScreen} />
      <Drawer.Screen name="signup" options={{ headerShown: false }} component={SignUpScreen} />

    </Drawer.Navigator>
  )
}

export default DrawerNavigator
