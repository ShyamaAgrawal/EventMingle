import { useRoute } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ScrollView,
    Modal,
    ToastAndroid,
    ActivityIndicator
} from "react-native";
import React, { useEffect, useState } from 'react'
import { BASE_URL, gStyle } from "../../../GlobalStyles";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import * as Animatable from "react-native-animatable";
import moment from "moment";
import { Bar } from 'react-native-progress';
import axios from "axios";



const Event = (props) => {
    const [tasks, setTasks] = useState([])
    const [isloading, setIsLoading] = useState(false);

    const route = useRoute();
    const { _id, name, start, end, location, date, desc } = route.params.event;
    // console.log(route.params.event);

    const [description, setDescription] = useState(desc)
    const [showModal, setShowModal] = useState(false)
    const [edit, setEdit] = useState(false)

    const [completedTasks, setcompletedTasks] = useState(0)
    const [totalTasks, settotalTasks] = useState(tasks.length)
    const [progress, setProgress] = useState(0);

    // useEffect(() => {
    //     if (totalTasks > 0) {
    //         const percentage = (completedTasks / totalTasks) * 100;
    //         setProgress(percentage / 100); // Progress value should be between 0 and 1
    //     }
    //     loadTasks()
    // }, []);


    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            // if (totalTasks > 0) {
            //     const percentage = (completedTasks / totalTasks) * 100;
            //     setProgress(percentage / 100); // Progress value should be between 0 and 1
            // }
            loadTasks()

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [props.navigation, totalTasks, completedTasks])

    const loadTasks = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${BASE_URL}/task-info/${_id}`)
            // console.log(res.data)
            setTasks(res.data)
            let ct = 0;
            for (let i in res.data) {
                if (res.data[i].status === 'completed') {
                    ct++;
                }
                // console.log(res.data[i])
            }
            console.log(res.data.length)
            console.log(ct)
            if (res.data.length > 0) {
                const percentage = (ct / res.data.length) * 100;
                setProgress(percentage / 100); // Progress value should be between 0 and 1
            }

            setIsLoading(false)
        }
        catch (error) {
            setIsLoading(false);
            console.log(error)
            ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
        }
    }


    return (
        <View View style={[styles.main, { height: '100%' }]} >
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
                <View style={{ marginVertical: responsiveHeight(3), alignItems: 'center' }}>
                    <Text
                        style={[
                            {
                                fontFamily: "Poppins_600SemiBold",
                                fontSize: responsiveFontSize(5),
                                color: '#fff',
                                textAlign:'center8'
                            },
                        ]}
                    >
                        {name}
                    </Text>
                </View>

            </View>
            <View style={{ height: responsiveHeight(70) }}>
                <ScrollView style={[styles.mid]}>

                    {/* Description */}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(2), }}>
                        <Text style={[styles.text]}>Description</Text>
                        <TouchableOpacity onPress={() => { setShowModal(true) }}>
                            <Image source={require('../../../assets/images/desc.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.desc]}>

                        {/* Date and Time  */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={require('../../../assets/images/date.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), marginRight: responsiveWidth(1), transform: [{ rotateY: '180deg' }] }} />
                                <Text style={{ fontFamily: 'Poppins_400Regular', color: 'lightgray', fontSize: responsiveFontSize(1.8) }}>{moment(date).format("DD MMM, YYYY")}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <Image source={require('../../../assets/images/wall-clock.png')} style={{ width: responsiveWidth(5), height: responsiveWidth(5), marginRight: responsiveWidth(1), transform: [{ rotateY: '180deg' }] }} />
                                <Text style={{ color: 'lightgray', fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(1.8) }}>{moment(start).format("hh:mm a")} - {moment(end).format("hh:mm a")}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Tasks */}
                    <View style={{ marginTop: responsiveHeight(1) }}>
                        <Text style={[styles.text]}>Tasks</Text>

                        {/* Progress Bar */}
                        <View style={[styles.progressBar, { marginTop: responsiveHeight(1), alignItems: 'center' }]}>
                            <Bar
                                progress={progress}
                                width={responsiveWidth(90)}
                                color={'#43CD43'} // Change color as needed
                                borderColor="gray" // Change border color as needed
                                height={20}
                                borderRadius={30}
                                animated={true}
                                animationType='spring'
                                style={styles.progressBar}
                            >
                                <Text style={styles.progressText}>{Math.round(progress * 100)}% Completed</Text>
                            </Bar>

                        </View>

                        {/* Tasks added */}


                        {isloading ?  <View style={{  height: responsiveHeight(45), width: responsiveWidth(100), justifyContent: 'center', alignItems: 'center',}}>
                            <ActivityIndicator size={50} color={gStyle.pc} />
                            <Text style={styles.text}>Loading Tasks...</Text>
                        </View> : <View style={{ marginVertical: responsiveHeight(3), }}>
                            <FlatList data={tasks} scrollEnabled={false} renderItem={(task) => {
                                return (
                                    <TouchableOpacity onPress={() => { props.navigation.navigate('Task', { task: task.item }) }} style={{
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
                        </View> }
                    </View>
                </ScrollView>
            </View>
            {/* Add Task */}
            <View>
                <TouchableOpacity style={[styles.icon]} onPress={() => props.navigation.navigate('AddTask', { eventName: name, eventId: _id })}>
                    <Image
                        source={require("../../../assets/images/add.png")}
                        style={{ width: 30, height: 30, alignSelf: 'center' }}
                    />
                </TouchableOpacity>
            </View>


            <Modal transparent={true} visible={showModal} animationType='fade'>
                <View style={{ position: 'absolute', backgroundColor: '#0000008a', alignItems: 'center', justifyContent: 'center', height: responsiveHeight(100), width: responsiveWidth(100) }}>
                    <View style={{ width: responsiveWidth(90), height: responsiveHeight(70), backgroundColor: '#262626', borderRadius: responsiveWidth(5), padding: responsiveWidth(4) }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: responsiveHeight(2), }}>
                            <Text style={[styles.text]}>Description</Text>
                            {edit ? <TouchableOpacity>
                                <Image source={require('../../../assets/images/save.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />
                            </TouchableOpacity> : <TouchableOpacity onPress={() => { setEdit(true) }}>
                                <Image source={require('../../../assets/images/write.png')} style={{ width: responsiveWidth(8), height: responsiveWidth(8) }} />
                            </TouchableOpacity>}
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {description.length == 0 ? <Text style={{ color: 'gray', fontFamily: 'Poppins_400Regular', fontSize: responsiveFontSize(2), textAlign: 'center' }}>Add Description</Text>
                                : <TextInput multiline={true} editable={edit} style={{ color: 'lightgray', fontFamily: 'Poppins_400Regular', fontSize: responsiveFontSize(1.8), textAlign: 'auto' }}>{description}</TextInput>}
                        </ScrollView>
                        <TouchableOpacity onPress={() => { setShowModal(false); setEdit(false) }}><Text style={[styles.text, { textAlign: 'center', color: '#AF0000' }]}>close</Text></TouchableOpacity>

                    </View>
                </View>

            </Modal>


        </View >
    )
}


const styles = StyleSheet.create({
    main: {
        backgroundColor: gStyle.pc,
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
        height: responsiveHeight(25)
    },
    mid: {
        flex: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        backgroundColor: gStyle.bg,
        padding: responsiveWidth(4),
        overflow: 'hidden'
    },
    desc: {
        backgroundColor: '#262626',
        maxHeight: responsiveHeight(30),
        borderRadius: responsiveWidth(2),
        padding: responsiveWidth(4),
    },
    progressBar: {
        position: 'relative',
    },
    progressText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -10 }],
        color: '#fff', // Text color
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
    icon: {
        backgroundColor: gStyle.pc,
        padding: 10,
        borderRadius: 50,
        margin: responsiveWidth(4),
        marginTop: responsiveHeight(-10),
        width: responsiveWidth(15),
        height: responsiveWidth(15),
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
});

export default Event 