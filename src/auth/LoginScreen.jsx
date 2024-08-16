import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ToastAndroid, Button, ActivityIndicator, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, gStyle } from '../../GlobalStyles'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LoginScreen = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isloading, setIsLoading] = useState(false);
    const [admin, setAdmin] = useState(false);
    const [member, setMember] = useState(false)


    function passwordHandler(p) {
        setPassword(p);
    }

    const onSubmitHandler = async (e) => {
        Keyboard.dismiss()

        if (email.length == 0 || password.length == 0) {
            ToastAndroid.show('Enter all details', ToastAndroid.SHORT);
            return;
        }
        const payLoad = {
            email: email,
            password: password
        }

        try {
            let res;
            if (admin) {
                setIsLoading(true)
                res = await axios.post(`${BASE_URL}/login-user`, payLoad)
                await AsyncStorage.setItem('role',"admin")
            }
            else if (member) {
                setIsLoading(true)
                res = await axios.post(`${BASE_URL}/login-member`, payLoad)
                await AsyncStorage.setItem('role', "member")

            }
            else {
                ToastAndroid.show('Select any role...', ToastAndroid.SHORT);
                return
            }

            // console.log(res)
            // const userData = res.data.response
            console.log(res.data.token)
            const token = res.data.token;
            await AsyncStorage.setItem('token', `${token}`)
            // await AsyncStorage.setItem('userData', `${userData}`)

            setEmail("");
            setPassword("");
            setIsLoading(false)
            ToastAndroid.show('Login Successful', ToastAndroid.SHORT);
            props.navigation.navigate('loading')

        }
        catch (error) {
            setIsLoading(false);
            if (error.response) {
                console.log(error.response.status)
                if (error.response.status === 401) {
                    ToastAndroid.show('Invalid Email', ToastAndroid.SHORT);
                    setEmail("")
                }
                else if (error.response.status === 400) {
                    // User already exists, handle the response
                    ToastAndroid.show('Invalid Login Credentials', ToastAndroid.SHORT);
                }
                else if (error.response.status === 500) {
                    ToastAndroid.show('Network Error', ToastAndroid.SHORT);
                }
                else {
                    ToastAndroid.show('Network Error', ToastAndroid.SHORT);
                }
            }
            else {
                ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
            }
        }
    }

    return (
        <View style={[styles.bg]}>
            <View  >
                <Text style={{ fontFamily: 'Poppins_700Bold', color: 'white', fontSize: responsiveFontSize(5), marginTop: responsiveHeight(2) }}>Welcome <Text style={{ color: '#FEB800' }}>User</Text> </Text>
                <Text style={{ fontFamily: 'Poppins_400Regular', color: 'rgba(255,255,255,0.5)', fontSize: responsiveFontSize(2) }}>sign in to continue</Text>
            </View>
            <View>
                <View style={{ marginVertical: responsiveHeight(2), }}>
                    <Text style={[styles.text]}>Email</Text>
                    <TextInput placeholder="Enter your email" style={[styles.textinput]} value={email} onChangeText={(text) => setEmail(text)} placeholderTextColor='rgba(255,255,255,0.5)' selectionColor='white' required/>
                </View>
                <View >
                    <Text style={[styles.text]}>Password</Text>
                    <TextInput placeholder="Enter your password" value={password} onChangeText={passwordHandler} secureTextEntry={true} style={[styles.textinput]} placeholderTextColor='rgba(255,255,255,0.5)' selectionColor='white' required/>
                    <Text style={[styles.text, { fontFamily: 'Poppins_400Regular', fontSize: responsiveFontSize(1.8), alignSelf: 'flex-end', marginTop: responsiveHeight(1), }]}>
                        Forgot Password?</Text>
                </View>
            </View>
            <View >
                <TouchableOpacity style={[gStyle.btn,{backgroundColor:!admin && !member ?'#262626':gStyle.pc}]} onPress={onSubmitHandler} >
                    <Text style={[styles.text]}>Sign in</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: responsiveHeight(1) }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
                <View>
                    <Text style={{
                        marginHorizontal: responsiveWidth(2.5), fontFamily: 'Poppins_400Regular',
                        color: 'rgba(255,255,255,0.5)', textAlign: 'center'
                    }}>Or Sign In with</Text>
                </View>
                <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',marginBottom: responsiveHeight(1.5), }}>
                    <TouchableOpacity style={[styles.oAuth, { borderColor: admin ? gStyle.pc : 'white' }]} onPress={() => { setAdmin(true); setMember(false)}}>
                        <Image source={require('../../assets/images/admin.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />
                    </TouchableOpacity>
                    <Text style={{ color: admin ? gStyle.pc : 'white', fontFamily:'Poppins_400Regular'}}>Admin</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: responsiveHeight(1.5), }}>
                    <TouchableOpacity style={[styles.oAuth,{borderColor:member ? gStyle.pc:'white'}]} onPress={() => { setAdmin(false); setMember(true) }}>
                        <Image source={require('../../assets/images/member.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />
                    </TouchableOpacity>
                    <Text style={{ color: member ? gStyle.pc : 'white', fontFamily: 'Poppins_400Regular' }}>Member</Text>
                </View>
            </View>
            {admin && <View >
                <Text style={[styles.text, { fontFamily: 'Poppins_400Regular', fontSize: responsiveFontSize(2), alignSelf: 'center' }]}>Don't have an account ? <Text style={{ color: gStyle.pc, fontSize: responsiveFontSize(2.2), textDecorationLine: 'underline' }} onPress={() => { props.navigation.navigate('signup') }}>Sign Up</Text></Text>
            </View>}

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
        borderWidth: 1,
        // width:20
    }
})

export default LoginScreen