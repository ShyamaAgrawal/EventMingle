import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    ScrollViewBase,
} from "react-native";
import React, { useState } from 'react'
import { gStyle } from "../../../GlobalStyles";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as Animatable from "react-native-animatable";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

const Task = (props) => {
    const route = useRoute();
    // console.log(route.params);
    const { _id, name, memberId, status, dueDate, postdate, desc } = route.params.task;
    // console.log(memberId)
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
                    {name}
                </Text>
            </View>

            <Animatable.View animation={"flash"} iterationCount={"infinite"} duration={4000} style={{ backgroundColor: status == 'active' ? '#43CD43' : 'gray', borderRadius: 30, width: responsiveWidth(40), marginLeft: responsiveWidth(4), paddingHorizontal: responsiveWidth(2) }}>
                <Text style={[styles.text, { textAlign: 'center' }]}>{status}</Text>
            </Animatable.View>

            <View style={{ margin: responsiveWidth(4) }}>
                <View style={{ borderRadius: 10, marginVertical: responsiveWidth(2), paddingVertical: responsiveWidth(2), maxHeight: responsiveFontSize(22) }}>
                    <Text style={[styles.text]}>Description</Text>
                    <ScrollView>
                        <Text style={{ color: 'lightgray', fontSize: responsiveFontSize(1.7), fontFamily: "Poppins_400Regular" }}>{desc}</Text>
                    </ScrollView>
                </View>
                <View style={[styles.member, { overflow: 'hidden', }]} >
                    <View style={{ width: responsiveWidth(1.5), backgroundColor: gStyle.pc, height: '100%' }}></View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <View style={{ backgroundColor: '#000', padding: responsiveWidth(4), borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../../../assets/images/profile.png')} style={{ tintColor: 'white', width: responsiveWidth(10), height: responsiveWidth(10) }} />
                        </View>
                        <View style={{ marginLeft: responsiveWidth(0), width: responsiveWidth(60) }}>
                            <Text style={{ color: 'white', fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.2) }}>{memberId.name.toUpperCase()}</Text>
                            <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{memberId.email}</Text>
                            <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{memberId.phone}</Text>
                            <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{memberId.position}</Text>

                        </View>
                    </View>
                </View>
                {/* Due date and assigned date */}
                <View style={[styles.dates, { overflow: 'hidden' }]} >
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Animatable.View animation={"fadeInRight"} delay={500} duration={1000} style={{ backgroundColor: '#262626', height: responsiveHeight(9.5), borderTopLeftRadius: 50, borderBottomLeftRadius: 50, padding: responsiveWidth(2.5), paddingLeft: responsiveWidth(10) }}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>Assigned On</Text>
                            <Text style={[styles.text, { color: 'lightgray' }]}>{moment(postdate).format("DD-MM-YYYY")}</Text>
                        </Animatable.View>
                        <Animatable.View animation={"fadeInRight"} delay={1000} duration={1000} style={{ backgroundColor: '#262626', height: responsiveHeight(9.5), borderTopLeftRadius: 50, borderBottomLeftRadius: 50, padding: responsiveWidth(2.5), paddingLeft: responsiveWidth(10) }}>
                            <Text style={[styles.text, { fontSize: responsiveFontSize(2) }]}>Due Date</Text>
                            <Text style={[styles.text, { color: 'lightgray' }]}>{moment(dueDate).format("DD-MM-YYYY")}</Text>
                        </Animatable.View>
                    </View>
                    <View style={{ width: responsiveWidth(1.5), backgroundColor: gStyle.pc, height: '100%' }}></View>
                </View>
            </View>

        </View >
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
        height: responsiveHeight(15),
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
    dates: {
        height: responsiveHeight(21),
        borderRadius: 10,
        marginBottom: responsiveHeight(2),
        display: 'flex',
        flexDirection: 'row'
    },
});


export default Task