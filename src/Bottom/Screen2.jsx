import { View, Text, Button, ToastAndroid } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";


const Screen2 = (props) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userData')
    ToastAndroid.show('Logged out Successfully', ToastAndroid.SHORT);

    setTimeout(() => {
      props.navigation.replace('loading')

    },1000)
  }
  return (
    <View>
      <Text>Screen2</Text>
      <Button title='logout' onPress={handleLogout} />
    </View>
  )
}

export default Screen2