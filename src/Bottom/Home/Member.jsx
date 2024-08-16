import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { BASE_URL, gStyle } from "../../../GlobalStyles";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as Animatable from "react-native-animatable";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Member = (props) => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        loadallMembers()
    }, [])

    const loadallMembers = async () => {
        let id = await AsyncStorage.getItem('userId')
        try {
            const allmembers = await axios.get(`${BASE_URL}/member-names/${id}`);
            // console.log(allmembers.data)
            setMembers(allmembers.data)
        }
        catch (e) {
            console.log(e)
        }
    }
    return (
        <View style={[styles.main, { height: '100%' }]}>
            <View style={[styles.top]}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
                        <Image
                            style={{ width: responsiveWidth(8), height: responsiveWidth(8) }}
                            source={require("../../../assets/images/hamburger.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                    >
                        <Image
                            style={{
                                width: responsiveWidth(8),
                                height: responsiveWidth(8),
                                tintColor: "white",
                            }}
                            source={require("../../../assets/images/back.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: responsiveHeight(3), marginLeft: responsiveWidth(4) }}>
                <Text
                    style={[
                        {
                            fontFamily: "Poppins_600SemiBold",
                            fontSize: responsiveFontSize(4.5),
                            color: gStyle.pc,
                        },
                    ]}
                >
                    Members
                </Text>
            </View>
            <View style={{ padding: responsiveWidth(4), height: responsiveHeight(72) }}>
                <FlatList data={members} showsVerticalScrollIndicator={false} renderItem={(mem) => {
                    return (
                        <TouchableOpacity onPress={() => { props.navigation.navigate('IndividualMember', { memberDetails: mem.item }) }}>
                            <View style={[styles.member, { overflow: 'hidden', }]} >
                                <View style={{ width: responsiveWidth(1.5), backgroundColor: gStyle.pc, height: '100%' }}></View>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                    <View style={{ backgroundColor: '#000', padding: responsiveWidth(3), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../../../assets/images/profile.png')} style={{ tintColor: 'white', width: responsiveWidth(8), height: responsiveWidth(8) }} />
                                    </View>
                                    <View style={{ marginLeft: responsiveWidth(0), width: responsiveWidth(60) }}>
                                        <Text style={{ color: 'white', fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.2) }}>{mem.item.name}</Text>
                                        <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{mem.item.position}</Text>

                                    </View>
                                    <TouchableOpacity>
                                        <Image source={require('../../../assets/images/back.png')} style={{ width: responsiveWidth(6), height: responsiveWidth(6), tintColor: 'lightgray', transform: [{ rotate: '180deg' }], marginRight: responsiveWidth(0), }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>

                    )
                }} />

            </View>
            <View>
                <TouchableOpacity style={[styles.icon]} onPress={() => props.navigation.navigate('AddMember')}>
                    <Image
                        source={require("../../../assets/images/add.png")}
                        style={{ width: 30, height: 30, alignSelf: 'center' }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: gStyle.bg,
    },
    text: {
        color: "white",
        fontFamily: "Poppins_500Medium",
        fontSize: responsiveFontSize(2.5),
    },

    top: {
        backgroundColor: gStyle.pc,
        padding: responsiveWidth(4),
        shadowColor: gStyle.pc,
        shadowRadius: 40,
        shadowOffset: { width: 0, height: 50 },
        elevation: 10,
        shadowOpacity: 1,
        height: responsiveHeight(8)
    },
    textinput: {
        color: "white",
        borderColor: "rgba(255,255,255,0.5)",
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        marginVertical: responsiveHeight(1),
    },
    member: {
        height: responsiveHeight(10),
        backgroundColor: '#262626',
        borderRadius: 10,
        marginBottom: responsiveHeight(2),
        display: 'flex',
        flexDirection: 'row'
    },
    icon: {
        backgroundColor: gStyle.pc,
        padding: 10,
        borderRadius: 50,
        margin: responsiveWidth(4),
        marginTop: responsiveHeight(-5.5),
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
});


export default Member