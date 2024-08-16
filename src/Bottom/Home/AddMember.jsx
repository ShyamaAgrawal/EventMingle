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
    Alert
} from "react-native";
import React, { useState } from 'react'
import { BASE_URL, gStyle } from "../../../GlobalStyles";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize,
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import * as DocumentPicker from 'expo-document-picker';


const AddMember = (props) => {
    const [data, setData] = useState({ name: "", email: "", contact: "", position: "" });
    const [showModal, setShowModal] = useState(false)
    const [isloading, setIsLoading] = useState(false);

    const [csvdata, setCsvData] = useState(null);
    const [filename, setFileName] = useState("");

    const ButtonAlert = (heading,data) =>
        Alert.alert(heading, data, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
        ]);
    const handleFilePick = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync();
            console.log(file)

            if (file.canceled) {
                ButtonAlert("CSV couldn't upload","You didn't select any file !");
                return;
            }

            // Ensure the selected file is a CSV file
            if (file.assets[0].mimeType !== "text/csv" && file.assets[0].mimeType !== "text/comma-separated-values") {
                alert('Please select a CSV file.');
                return;
            }

            const response = await fetch(file.assets[0].uri);
            let fileContent = await response.text();
            console.log('File content:', fileContent);
            console.log("-------------------------------")


            const lines = fileContent.split('\r');
            console.log(lines)

            // Map each line to an object
            const jsonData = lines.map(line => {
                const values = line.split(',');


                // Create a JSON object with field names
                return {
                    name: values[0],
                    email: values[1],
                    phone: values[2],
                    position: values[3],

                };
            });
            if (jsonData[0].email !== 'email' || jsonData[0].name !== 'name' || jsonData[0].phone !== 'phone' || jsonData[0].position !== 'role') {
                ButtonAlert("ERROR", "Add your data as name, email, phone, role format.");
                return;
                
            }
            console.log(jsonData);
            setCsvData(jsonData);
            setFileName(file.assets[0].name)
        }
        catch (err) {
            console.error(err);
        }
    };


    function handleChange(key, value) {
        // console.log(`Key: ${key}, Value: ${value}`);
        // Update the state with the new value
        setData(prevData => ({
            ...prevData,
            [key]: value
        }));
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const payLoad = {
            name: data.name,
            email: data.email,
            phone: data.contact,
            position: data.position
        }


        if (payLoad.name.length == 0 || payLoad.email.length == 0 || payLoad.phone.length == 0 || payLoad.position.length == 0) {
            ToastAndroid.show('Enter all details', ToastAndroid.SHORT);
            return;
        }
        setIsLoading(true)
        let id = await AsyncStorage.getItem('userId')
        Keyboard.dismiss()
        try {
            const res = await axios.post(`${BASE_URL}/register-member/${id}`, payLoad)
            console.log(res.data)
            setData({ name: "", email: "", contact: "", position: "" })
            setIsLoading(false)
            setShowModal(true)
            // ToastAndroid.show('Member Added Successfully', ToastAndroid.SHORT);
            // props.navigation.navigate('login')
        }
        catch (error) {
            setIsLoading(false);
            if (error.response.status === 422) {
                ToastAndroid.show('Email Already Exists', ToastAndroid.SHORT);
            }
            else {
                console.log(error)
                ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
            }
            setData({ name: "", email: "", contact: "", position: "" })
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
                    Add your member
                </Text>
            </View>
            <ScrollView style={{ padding: responsiveWidth(4) }}>
                <View style={{ marginVertical: responsiveHeight(1) }}>
                    <Text style={[styles.text]}>Name</Text>
                    <TextInput
                        placeholder="Enter name of your member"
                        style={[styles.textinput]}
                        value={data.name}
                        onChangeText={(value) => handleChange('name', value)}
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor="white"
                    />
                </View>
                <View style={{ marginVertical: responsiveHeight(1) }}>
                    <Text style={[styles.text]}>Email</Text>
                    <TextInput
                        placeholder="Enter email of your member"
                        style={[styles.textinput]}
                        value={data.email}
                        onChangeText={(value) => handleChange('email', value)}
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor="white"
                    />
                </View>
                <View style={{ marginVertical: responsiveHeight(1) }}>
                    <Text style={[styles.text]}>Contact No.</Text>
                    <TextInput
                        placeholder="Enter contact no. of your member"
                        style={[styles.textinput]}
                        value={data.contact}
                        onChangeText={(value) => handleChange('contact', value)}
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor="white"
                    />
                </View>
                <View style={{ marginVertical: responsiveHeight(1) }}>
                    <Text style={[styles.text]}>Role</Text>
                    <TextInput
                        placeholder="Enter role of your member"
                        style={[styles.textinput]}
                        value={data.position}
                        onChangeText={(value) => handleChange('position', value)}
                        placeholderTextColor="rgba(255,255,255,0.5)"
                        selectionColor="white"
                    />
                </View>

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

                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
                        <View>
                            <Text style={{
                                marginHorizontal: 10, fontFamily: 'Poppins_400Regular',
                                color: 'rgba(255,255,255,0.5)', textAlign: 'center'
                            }}>Or Upload CSV</Text>
                        </View>
                        <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(255,255,255,0.5)' }} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={handleFilePick} style={[styles.oAuth]}>
                            <Image source={require('../../../assets/images/upload-file.png')} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.upload]}>
                        <Text style={{
                            marginHorizontal: 10, fontFamily: 'Poppins_400Regular',
                            color: 'rgba(255,255,255,0.5)', textAlign: 'center'
                        }}>{filename !== "" ? filename : "No file choosen"}</Text>
                        {filename !== "" && <TouchableOpacity style={{backgroundColor:'#262626',padding:responsiveWidth(2),borderRadius:responsiveWidth(2)}}>
                            <Text style={[styles.text,{fontSize:responsiveFontSize(2)}]}>Upload</Text>
                        </TouchableOpacity>}
                    </View>
                    

                </View>
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
                            <Text style={[styles.text, { color: 'grey' }]}>Member Added Successfully</Text>
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
            </ScrollView>
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
    upload: {
        marginBottom: responsiveHeight(10),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
  }
});


// AddEvent.navigationOptions = {
//   tabBarVisible: false, // Hide bottom navigation for this screen
// };
export default AddMember