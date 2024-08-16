import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid, Image, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, gStyle } from '../../GlobalStyles'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from "axios";



const SignUpScreen = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);
  // let navigation = useNavigation();
  function passwordHandler(p) {
    // console.warn(p);
    setPassword(p);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const payLoad = {
      name: name,
      email: email,
      password: password
    }
    setIsLoading(true)
    Keyboard.dismiss()
    try {
      const res = await axios.post(`${BASE_URL}/register-user`,payLoad)
      console.log(res) 
      setName("");
      setEmail("");
      setPassword("");
      setIsLoading(false)
      ToastAndroid.show('Registered Successfully', ToastAndroid.SHORT);
      props.navigation.navigate('login')
    }
    catch (error) {
      setIsLoading(false);
      // console.warn(error);
      console.log(error)
    }
  }


  return (
    <View style={[styles.bg]}>
      
      <View  >
        <Text style={{ fontFamily: 'Poppins_700Bold', color: 'white', fontSize: responsiveFontSize(5), marginTop: responsiveHeight(2) }}>Create <Text style={{ color: '#FEB800' }}>Account</Text> </Text>
        <Text style={{ fontFamily: 'Poppins_400Regular', color: 'rgba(255,255,255,0.5)', fontSize: responsiveFontSize(2) }}>sign up to continue</Text>
      </View>
      <View>
        <View style={{ marginVertical: responsiveHeight(2), }}>
          <Text style={[styles.text]}>Name</Text>
          <TextInput placeholder="Enter your name" style={[styles.textinput]} value={name} onChangeText={(text) => setName(text)} placeholderTextColor='rgba(255,255,255,0.5)' selectionColor='white' />
        </View>
        <View style={{ marginBottom: responsiveHeight(2), }}>
          <Text style={[styles.text]}>Email</Text>
          <TextInput placeholder="Enter your email" style={[styles.textinput]} value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor='rgba(255,255,255,0.5)' selectionColor='white' />
        </View>
        <View >
          <Text style={[styles.text]}>Password</Text>
          <TextInput placeholder="Enter your password" value={password} onChangeText={passwordHandler} secureTextEntry={true} style={[styles.textinput]} placeholderTextColor='rgba(255,255,255,0.5)' selectionColor='white' />

        </View>
      </View>
      <View >
        <TouchableOpacity style={[gStyle.btn]} onPress={onSubmitHandler}>
          <Text style={[styles.text]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(1) }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
        <View>
          <Text style={{
            marginHorizontal: 10, fontFamily: 'Poppins_400Regular',
            color: 'rgba(255,255,255,0.5)', textAlign: 'center'
          }}>Or Sign Up with</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={[styles.oAuth]}>
          <Image source={require('../../assets/images/facebook.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />
        </View>
        <View style={[styles.oAuth]}>
          <Image source={require('../../assets/images/google.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />
        </View>
      </View>
      <View  >
        <Text style={[styles.text, { fontFamily: 'Poppins_400Regular', fontSize: responsiveFontSize(2), alignSelf: 'center' }]}>Already have an account ? <Text style={{ color: '#FEB800', fontSize: responsiveFontSize(2.2), textDecorationLine: 'underline' }} onPress={() => { props.navigation.goBack('login') }}>Sign In</Text></Text>
      </View>
      {isloading && <View style={{ position: 'absolute', height: responsiveHeight(100), width: responsiveWidth(100), backgroundColor: 'rgba(255,255,255,0.4)', justifyContent: 'center', alignItems: 'center', top: 0 }}>
        <ActivityIndicator size={50} color={gStyle.pc} />
      </View>}
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontFamily: 'Poppins_500Medium',
    fontSize: responsiveFontSize(2.5)
  },
  bg: {
    backgroundColor: gStyle.bg,
    flex: 1,
    padding: responsiveWidth(4)
  },
  textinput: {
    color: 'white',
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
    marginVertical: responsiveHeight(0),
  },
  oAuth: {
    backgroundColor: 'rgba(255,255,255,0.80)',
    margin: responsiveWidth(5),
    padding: responsiveWidth(2),
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    // width:20
  }
})

export default SignUpScreen