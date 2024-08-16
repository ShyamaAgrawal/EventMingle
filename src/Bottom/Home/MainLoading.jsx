import { View, Text,ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { gStyle } from '../../../GlobalStyles'
import AsyncStorage from "@react-native-async-storage/async-storage";



const MainLoading = (props) => {
    useEffect(() => {
        checkRole();
    }, [])
    const checkRole = async() => {
        const role = await AsyncStorage.getItem('role')
        if (role === 'admin') {
            props.navigation.replace('HomeScreen')
        }
        else {
            props.navigation.replace('MemPortal')
        }
    }
  return (
      <View style={{ flex: 1, backgroundColor: gStyle.bg, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size={50} color={gStyle.pc} />
      </View>
  )
}

export default MainLoading