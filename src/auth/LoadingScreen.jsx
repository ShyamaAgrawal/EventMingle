import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import { BASE_URL, gStyle } from '../../GlobalStyles'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'


const LoadingScreen = (props) => {
  useEffect(() => {
    verify()
  }, [])

  const verify = async () => {
    const token = await AsyncStorage.getItem('token')
    const role = await AsyncStorage.getItem('role') 
    if (token != null && role==='admin') {
      try {
        const res = await axios.post(`${BASE_URL}/validate-user`, { token: token });
        console.log(res.data.response)
        const id = res.data.response._id;
        await AsyncStorage.setItem('userId', `${id}`)
        const userData = {
          id: res.data.response._id,
          name: res.data.response.name,
          email: res.data.response.email
        }
        // console.log(res.data.response)
        await AsyncStorage.setItem('userData', JSON.stringify(userData))
        // console.log(userData)
        props.navigation.replace('parent')
      }
      catch (e) {
        console.log(e)
        props.navigation.replace('login')
      }
    }
    else if (token != null && role === 'member') {
      try {
        const res = await axios.post(`${BASE_URL}/validate-member`, { token: token });
        console.log(res.data.response)
        const id = res.data.response._id;
        await AsyncStorage.setItem('userId', `${id}`)
        const userData = {
          id: res.data.response._id,
          name: res.data.response.name,
          email: res.data.response.email
        }
        // console.log(res.data.response)
        await AsyncStorage.setItem('userData', JSON.stringify(userData))
        // console.log(userData)
        props.navigation.replace('parent')
      }
      catch (e) {
        console.log(e)
        props.navigation.replace('login')
      }
    }
    else {
      props.navigation.replace('login')
    }
  }
  return (
      <View style={{ flex: 1, backgroundColor: gStyle.bg, justifyContent: 'center', alignItems:'center'}}>
      <ActivityIndicator size={50} color={gStyle.pc}/>
    </View>
  )
}

export default LoadingScreen