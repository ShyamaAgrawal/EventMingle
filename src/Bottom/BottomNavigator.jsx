import { View, Text, Image } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Screen2 from './Screen2';
import Screen3 from './Screen3';
import HomeStack from './Home/HomeStack';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='HomeStack'   screenOptions={{
      tabBarHideOnKeyboard: true, tabBarActiveBackgroundColor: '#262626', tabBarInactiveBackgroundColor: '#262626', tabBarShowLabel: false
    }}>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{
        headerShown: false,
        tabBarIcon: (tabInfo) => {
          return (
            <Image source={require('../../assets/images/home.png')} style={{ height: 30, width: 30, tintColor: tabInfo.focused ? 'white' : 'black' }} />
          )
        }
      }} /> 
      <Tab.Screen name="Screen2" component={Screen2} options={{
        headerShown: false,
        tabBarIcon: (tabInfo) => {
          return (
            <Image source={require('../../assets/images/notification.png')} style={{ height: 30, width: 30, tintColor: tabInfo.focused ? 'white' : 'black' }} />
          )
        }
      }} />
      


    </Tab.Navigator>
  )
}

export default BottomNavigator


