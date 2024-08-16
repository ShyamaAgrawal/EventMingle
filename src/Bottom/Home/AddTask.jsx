
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Modal,
    Pressable,
    ActivityIndicator,
    Keyboard,
    ToastAndroid,
    FlatList
} from "react-native";
import React, { useEffect, useState } from 'react'
import { BASE_URL, gStyle } from "../../../GlobalStyles";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useRoute } from "@react-navigation/native";


const AddTask = (props) => {
    const [data, setData] = useState({ taskName: "", dueDate: new Date(), memberId: "", memberName: "", desc: "" });
    const [showModal, setShowModal] = useState(false)
    const [isloading, setIsLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [showmember, setShowmember] = useState(false);
    const [members, setMembers] = useState([])
    // const [taskDate, setTaskDate] = useState(new Date());

    const route = useRoute();
    const { eventName, eventId } = route.params;
    // console.log(route.params);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setData(prevData => ({
            ...prevData,
            ['dueDate']: date
        }));
        hideDatePicker();
    };


    function handleChange(key, value) {
        // console.log(`Key: ${key}, Value: ${value}`);
        // Update the state with the new value
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    }

    useEffect(() => {
        loadMembers()
    }, [])

    const loadMembers = async () => {
        let id = await AsyncStorage.getItem('userId')
        try {
            const memberr = await axios.get(`${BASE_URL}/member-names/${id}`);
            console.log(memberr.data)
            setMembers(memberr.data)
        }
        catch (e) {
            console.log(e)
        }
    }


    //on adding task
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const payLoad = {
            name: data.taskName,
            dueDate: data.dueDate,
            memberId: data.memberId,
            desc: data.desc
            // memberName: data.memberName,
        }

        if (payLoad.name.length == 0) {
            ToastAndroid.show('Enter all details', ToastAndroid.SHORT);
            return;
        }
        setIsLoading(true)
        let id = await AsyncStorage.getItem('userId')
        Keyboard.dismiss()
        try {
            const res = await axios.post(`${BASE_URL}/create-task/${eventId}`, payLoad)
            console.log(res.data)
            setData({ taskName: "", dueDate: new Date(), memberId: "", memberName: "", desc: "" })
            setIsLoading(false)
            setShowModal(true)
        }
        catch (error) {
            setIsLoading(false);
            console.log(error)
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
            setData({ taskName: "", dueDate: new Date(), memberId: "", memberName: "", desc: "" })
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
            <View style={{ marginHorizontal: responsiveWidth(4) }}>
                <Animatable.View
                    style={[gStyle.btn, { backgroundColor: '#262626', }]}
                    animation={"bounceIn"}
                    duration={1000}
                    delay={300}
                >
                    <Text style={[styles.text, { color: gStyle.pc }]}>{eventName}</Text>
                </Animatable.View>
            </View>
            <View style={{ padding: responsiveWidth(4) }}>
                <View style={{ marginVertical: responsiveHeight(0) }}>
                    <Text style={[styles.text]}>TaskName</Text>
                    <TextInput
                        placeholder="Enter name of your task"
                        style={[styles.textinput]}
                        value={data.taskName}
                        onChangeText={(value) => handleChange('taskName', value)}
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor="white"
                    />
                </View>

                <View style={{ marginVertical: responsiveHeight(1) }}>
                    <Text style={[styles.text]}>Task Description</Text>
                    <TextInput
                        placeholder="Add description of your task"
                        multiline={true}
                        style={[styles.textinput]}
                        maxLength={200}
                        numberOfLines={3}
                        value={data.desc}
                        onChangeText={(value) => handleChange('desc', value)}
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor="white"
                    />
                </View>

                <TouchableOpacity style={{ marginVertical: responsiveHeight(1) }} onPress={() => { Keyboard.dismiss(); setShowmember(!showmember) }}>
                    <Text style={[styles.text]}>Member Assigned</Text>
                    <TextInput
                        placeholder="Select member"
                        style={[styles.textinput]}
                        value={data.memberName}
                        editable={false}
                        // onChangeText={(value) => handleChange('memberName', value)}
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor="white"
                    />
                </TouchableOpacity>
                {showmember && <View style={{ height: responsiveHeight(32) }}>
                    <FlatList data={members} scrollEnabled={true} showsVerticalScrollIndicator={false} renderItem={(members) => {
                        return (
                            <TouchableOpacity style={[styles.mem]} onPress={() => { handleChange('memberName', members.item.name); handleChange('memberId', members.item._id); setShowmember(false); }}>
                                <Text style={[styles.text]}>{members.item.name}</Text>
                            </TouchableOpacity>
                        )
                    }} />
                </View>}

                <View >
                    <TouchableOpacity onPress={showDatePicker}>
                        <Text style={[styles.text]}>Due Date of Task</Text>
                        <TextInput
                            numberOfLines={1}
                            editable={false}
                            placeholder="Choose due Date of Task"
                            value={moment(data.dueDate).format("DD MMMM, YYYY")}
                            style={[
                                styles.textinput,
                            ]}
                        />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            maximumDate={new Date(moment().add(+10000, "days"))}
                            mode="date"
                            onChange={(date) => setEventDate(date)}
                            value={handleConfirm}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            backgroundColor={gStyle.pc}
                            textColor="purple"
                            isDarkModeEnabled={true}
                        />
                    </TouchableOpacity>
                </View >


                <TouchableOpacity onPress={onSubmitHandler}>
                    <Animatable.View
                        style={[gStyle.btn]}
                        animation={"bounceIn"}
                        duration={1000}
                        delay={300}
                    >
                        <Text style={[styles.text]}>Add Now</Text>
                    </Animatable.View>
                </TouchableOpacity>

                <Modal transparent={true} visible={showModal} animationType='fade'>
                    <View style={{ position: 'absolute', backgroundColor: '#0000008a', alignItems: 'center', justifyContent: 'center', height: responsiveHeight(100), width: responsiveWidth(100) }}>
                        <View style={{ width: responsiveWidth(85), height: responsiveHeight(50), backgroundColor: '#FFFFFF', borderRadius: responsiveWidth(5), alignItems: 'center' }}>
                            <View style={{ width: responsiveWidth(85), height: responsiveHeight(2), backgroundColor: '#43CD43', borderTopLeftRadius: responsiveWidth(5), borderTopRightRadius: responsiveWidth(5) }}>

                            </View>
                            <Image source={require('../../../assets/images/check2.png')} style={{ margin: responsiveWidth(8), width: responsiveWidth(25), height: responsiveWidth(25) }} />
                            <Text
                                style={[
                                    {
                                        fontFamily: "Poppins_600SemiBold",
                                        fontSize: responsiveFontSize(4.5),
                                        color: '#43CD43',
                                    },
                                ]}
                            >
                                SUCCESS!
                            </Text>
                            <Text style={[styles.text, { color: 'grey' }]}>Task Added Successfully</Text>
                            <Pressable onPress={() => { setShowModal(false) }}>
                                <Animatable.View
                                    style={[gStyle.btn, { backgroundColor: '#43CD43', width: responsiveWidth(30) }]}
                                    animation={"bounceIn"}
                                    duration={1000}
                                    delay={300}
                                >
                                    <Text style={[styles.text]}>OK</Text>
                                </Animatable.View>
                            </Pressable>

                        </View>
                    </View>
                </Modal>
            </View>
            {isloading && <View style={{ position: 'absolute', height: responsiveHeight(100), width: responsiveWidth(100), backgroundColor: 'rgba(255,255,255,0.4)', justifyContent: 'center', alignItems: 'center', top: 0 }}>
                <ActivityIndicator size={50} color={gStyle.pc} />
            </View>}
        </View>
    );
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
        padding: responsiveWidth(3),
        borderRadius: responsiveWidth(2),
    },
    mem: {
        backgroundColor: '#262626',
        marginBottom: responsiveHeight(1),
        padding: responsiveWidth(1.5),
        paddingLeft: responsiveWidth(4),
        borderRadius: responsiveWidth(2),
    }
});


// AddEvent.navigationOptions = {
//   tabBarVisible: false, // Hide bottom navigation for this screen
// };
export default AddTask