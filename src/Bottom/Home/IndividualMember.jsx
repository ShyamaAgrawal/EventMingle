import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ToastAndroid,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from 'react'
import { BASE_URL, gStyle } from "../../../GlobalStyles";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as Animatable from "react-native-animatable";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import axios from "axios";


const IndividualMember = (props) => {
    const [tasks, setTasks] = useState([]);
    const [isloading, setIsLoading] = useState(false);


    const route = useRoute();
    // console.log(route.params.memberDetails);
    const { _id,name, email, phone, position } = route.params.memberDetails;

    useEffect(() => {
        loadTasks();
    },[])
    const loadTasks = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}/members-task/${_id}`)
            console.log(res.data)
            setTasks(res.data)
            setIsLoading(false)
        }
        catch (error) {
            setIsLoading(false);
            console.log(error)
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
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
            <View style={{ marginVertical: responsiveHeight(3), marginHorizontal: responsiveWidth(4) }}>
                <View style={{ height: responsiveHeight(18), flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#262626', borderRadius: 10 }}>
                    <View style={{ backgroundColor: '#000', padding: responsiveWidth(4), borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../../../assets/images/profile.png')} style={{ tintColor: 'white', width: responsiveWidth(12), height: responsiveWidth(12) }} />
                    </View>
                    <View style={{ marginLeft: responsiveWidth(0), width: responsiveWidth(60) }}>
                        <Text style={{ color: gStyle.pc, fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.5) }}>{name}</Text>
                        <Text style={{ color: 'white', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(2) }}>{email}</Text>
                        <Text style={{ color: 'white', fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2) }}>{phone}</Text>
                        <Text style={{ color: 'white', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(2) }}>{position}</Text>

                    </View>
                </View>
            </View>
            {/* Tasks */}
            <View style={{ marginHorizontal: responsiveWidth(4) }}>
                <Text style={[styles.text, { fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(3) }]}>My Tasks</Text>

                {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: 'gray', borderWidth: 2 }}>
                    <TouchableOpacity style={{ width: '49.5%', alignItems: 'center', padding: responsiveWidth(1) }} onPress={() => setActive(true)}>
                        <Text style={{ color: active ? '#43CD43' : "gray", fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.5) }}>Ongoing</Text>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'gray', width: '1%' }}></View>
                    <TouchableOpacity style={{ width: '49.5%', alignItems: 'center', padding: responsiveWidth(1) }} onPress={() => setActive(false)}>
                        <Text style={{ color: active ? 'gray' : '#43CD43', fontFamily: 'Poppins_600SemiBold', fontSize: responsiveFontSize(2.5) }}>Completed</Text>
                    </TouchableOpacity>
                </View> */}

                <View style={{ marginVertical: responsiveHeight(3),height:responsiveHeight(50) }}>
                    <FlatList data={tasks} scrollEnabled renderItem={(task) => {
                        return (
                            <TouchableOpacity style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
                                marginBottom: responsiveHeight(2),
                            }}>
                                <View style={[styles.task]}>
                                    <TouchableOpacity>
                                        {task.item.status === 'completed' ? <Image source={require('../../../assets/images/completed.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8), tintColor: 'gray' }} /> :
                                            <Image source={require('../../../assets/images/pending.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />}
                                    </TouchableOpacity>
                                    <Text style={[styles.text, { fontSize: responsiveFontSize(2), marginLeft: responsiveWidth(3), color: task.item.status === 'completed' ? 'gray' : 'white' }]}>{task.item.name}</Text>
                                </View>
                                <Text style={{ fontFamily: 'Poppins_400Regular', color: 'white', fontSize: responsiveFontSize(2) }}>{moment(task.item.dueDate).format("DD MMM")}</Text>
                            </TouchableOpacity>
                        )
                    }} />
                </View>

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
    task: {
        width: responsiveWidth(70),
        height: responsiveHeight(8),
        backgroundColor: '#262626',
        borderRadius: 10,
        // marginBottom: responsiveHeight(2),
        display: 'flex',
        flexDirection: 'row',
        padding: responsiveWidth(4),
        alignItems: 'center',

    },
});


export default IndividualMember