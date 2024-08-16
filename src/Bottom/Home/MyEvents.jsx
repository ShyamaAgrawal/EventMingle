import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from 'react'
import { BASE_URL, gStyle } from "../../../GlobalStyles";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as Animatable from "react-native-animatable";
import { set } from "react-native/Libraries/Settings/Settings";

const MyEvents = (props) => {

    const [event, setEvent] = useState([])

    const [completedEvents, setcompletedEvents] = useState([])


    const weekdayArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const [active, setActive] = useState(true);
    const [isloading, setIsloading] = useState(false)

    useEffect(() => {
        handleOngoing()
        handleCompletedEvents()
    }, [])

    const handleOngoing = async () => {
        setIsloading(true);
        let id = await AsyncStorage.getItem('userId')
        // console.log(id)
        try {
            const res = await axios.get(`${BASE_URL}/ongoing-event/${id}`);
            // console.log(res.data)
            setEvent(res.data)
            setIsloading(false)
        }
        catch (error) {
            setIsloading(false)
            console.log(error)
        }
    }

    const handleCompletedEvents = async () => {
        setIsloading(true);
        let id = await AsyncStorage.getItem('userId')
        // console.log(id)
        try {
            const res = await axios.get(`${BASE_URL}/completed-event/${id}`);
            // console.log(res.data)
            setcompletedEvents(res.data)
            setIsloading(false)
        }
        catch (error) {
            setIsloading(false)
            console.log(error)
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
                            props.navigation.navigate("HomeScreen");
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
                >My Events
                </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'gray', borderWidth: 2 }}>
                <TouchableOpacity style={{ width: '49.5%', alignItems: 'center', padding: responsiveWidth(1) }} onPress={() => setActive(true)}>
                    <Text style={{ color: active ? '#43CD43' : "gray", fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.5) }}>Ongoing</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: 'gray', width: '1%' }}></View>
                <TouchableOpacity style={{ width: '49.5%', alignItems: 'center', padding: responsiveWidth(1) }} onPress={() => setActive(false)}>
                    <Text style={{ color: active ? 'gray' : '#43CD43', fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.5) }}>Completed</Text>
                </TouchableOpacity>
            </View>
            <View style={{ padding: responsiveWidth(4), height: responsiveHeight(66) }}>

                {active ?
                    //ongoing events
                    event.length === 0 && !isloading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text, { color: 'gray', }]}>No Ongoing Events</Text>
                    </View> :

                        <FlatList data={event} showsVerticalScrollIndicator={false} renderItem={(event, index) => {
                            return (
                                <TouchableOpacity onPress={() => props.navigation.navigate('Event', { event: event.item })} >
                                    <Animatable.View style={[styles.member, { overflow: 'hidden' }]} animation={"fadeInUp"} duration={1000} delay={index * 1000}>
                                        <View style={{ width: responsiveWidth(20), backgroundColor: gStyle.pc, height: '100%', borderRadius: responsiveWidth(4), justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveHeight(4) }}>
                                            <Text style={{ fontFamily: 'Poppins_700Bold', color: 'brown', fontSize: responsiveFontSize(5.5) }}>{moment(event.item.date).format("DD")}</Text>
                                            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#fff', fontSize: responsiveFontSize(3), lineHeight: responsiveHeight(4) }}>{moment(event.item.date).format("MMM")}</Text>
                                            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#fff', fontSize: responsiveFontSize(2) }}>{weekdayArr[moment(event.item.date).weekday()]}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                            <View style={{ marginLeft: responsiveWidth(1), width: responsiveWidth(60) }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Text style={{ width: responsiveWidth(55), color: 'white', fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.5) }}>{event.item.name.substring(0, 15)}</Text>
                                                    <Animatable.View animation={"flash"} iterationCount={"infinite"} duration={4000} style={styles.blink}></Animatable.View>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={require('../../../assets/images/location.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), marginRight: responsiveWidth(1) }} />
                                                    <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{event.item.location}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }} >
                                                    <Image source={require('../../../assets/images/wall-clock.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), marginRight: responsiveWidth(1), transform: [{ rotateY: '180deg' }] }} />
                                                    <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{moment(event.item.startTime).format("hh:mm a")} - {moment(event.item.endTime).format("hh:mm a")}</Text>
                                                </View>

                                            </View>

                                        </View>
                                    </Animatable.View>
                                </TouchableOpacity>

                            )
                        }} /> :

                    // completed events
                    completedEvents.length === 0 && !isloading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={[styles.text, { color: 'gray', }]}>You haven't completed any event</Text>
                    </View> :

                        <FlatList data={completedEvents} showsVerticalScrollIndicator={false} renderItem={(event, index) => {
                            return (
                                <TouchableOpacity onPress={() => props.navigation.navigate('Event', { event: event.item })} >
                                    <Animatable.View style={[styles.member, { overflow: 'hidden' }]} animation={"fadeInUp"} duration={1000} delay={index * 100}>


                                        <View style={{ width: responsiveWidth(20), backgroundColor: '#717070', height: '100%', borderRadius: responsiveWidth(4), justifyContent: 'center', alignItems: 'center', paddingVertical: responsiveHeight(4) }}>
                                            <Text style={{ fontFamily: 'Poppins_700Bold', color: 'brown', fontSize: responsiveFontSize(5.5) }}>{moment(event.item.date).format("DD")}</Text>
                                            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#fff', fontSize: responsiveFontSize(3), lineHeight: responsiveHeight(4) }}>{moment(event.item.date).format("MMM")}</Text>
                                            <Text style={{ fontFamily: 'Poppins_700Bold', color: '#fff', fontSize: responsiveFontSize(2) }}>{weekdayArr[moment(event.item.date).weekday()]}</Text>
                                        </View>
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>

                                            <View style={{ marginLeft: responsiveWidth(1), width: responsiveWidth(60) }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Text style={{ width: responsiveWidth(55), color: 'gray', fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.5) }}>{event.item.name.substring(0, 15)}</Text>
                                                    <Image source={require('../../../assets/images/completed.png')} style={{ width: responsiveWidth(6), height: responsiveWidth(6) }} />
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image source={require('../../../assets/images/location.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), marginRight: responsiveWidth(1) }} />
                                                    <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{event.item.location}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', marginTop: responsiveHeight(2) }} >
                                                    <Image source={require('../../../assets/images/wall-clock.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), marginRight: responsiveWidth(1), transform: [{ rotateY: '180deg' }] }} />
                                                    <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{moment(event.item.start).format("hh:mm a")} - {moment(event.item.end).format("hh:mm a")}</Text>
                                                </View>

                                            </View>

                                        </View>
                                    </Animatable.View>
                                </TouchableOpacity>

                            )
                        }} />}


                {isloading && <View style={{ position: 'absolute', height: responsiveHeight(100), width: responsiveWidth(100), justifyContent: 'center', alignItems: 'center', top: 0 }}>
                    <ActivityIndicator size={50} color={gStyle.pc} />
                    <Text style={styles.text}>Loading Events...</Text>
                </View>}
            </View>
            <View>
                <TouchableOpacity style={[styles.icon]} onPress={() => props.navigation.navigate('AddEvent')}>
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
        height: responsiveHeight(15),
        backgroundColor: '#262626',
        borderRadius: responsiveWidth(4),
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
    blink: {
        width: responsiveWidth(3),
        height: responsiveWidth(3),
        backgroundColor: '#43CD43',
        borderRadius: 50,
    }
});


export default MyEvents

// 43CD43


// {
//     name: 'Spandan',
//         start: '2024-03-16T11:35:00.000Z',
//             end: '2024-03-16T11:35:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-16T09:10:14.336Z',
//                         desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo deserunt possimus sunt! Eos ab, quod omnis aut sit quasi temporibus incidunt ipsa corporis. Nobis, earum quas magni ipsum laboriosam sequi autem aliquid ut rem suscipit "
// },
// {
//     name: 'Spandan 2.0',
//         start: '2024-03-20T12:30:00.000Z',
//             end: '2024-03-20T16:00:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-22',
//                         desc: ""
// },
// {
//     name: 'Spandan',
//         start: '2024-03-16T11:35:00.000Z',
//             end: '2024-03-16T11:35:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-16T09:10:14.336Z',
//                         desc: ""

// },
// {
//     name: 'Spandan',
//         start: '2024-03-16T11:35:00.000Z',
//             end: '2024-03-16T11:35:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-16T09:10:14.336Z',
//                         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum lorem50"


// },
// {
//     name: 'Spandan',
//         start: '2024-03-16T11:35:00.000Z',
//             end: '2024-03-16T11:35:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-16T09:10:14.336Z',
//                         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum"

// },
// {
//     name: 'Spandan',
//         start: '2024-03-16T11:35:00.000Z',
//             end: '2024-03-16T11:35:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-16T09:10:14.336Z',
//                         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cumLorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum",

//         }



// {
//     name: 'Spectra',
//         start: '2024-03-16T11:35:00.000Z',
//             end: '2024-03-16T11:35:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-01T09:10:14.336Z',
//                         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cumLorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum",

//     },
// {
//     name: 'Spandan',
//         start: '2024-03-16T11:35:00.000Z',
//             end: '2024-03-16T11:35:00.000Z',
//                 location: 'KC Ground',
//                     date: '2024-03-16T09:10:14.336Z',
//                         desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cumLorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates autem corporis, asperiores, facere, voluptate totam qui nostrum minima nobis eligendi pariatur numquam aperiam non. Nostrum consectetur fugit sint consequuntur cum",

//         },