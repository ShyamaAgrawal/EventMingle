import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ToastAndroid,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useState } from 'react'
import { BASE_URL, gStyle } from "../../../GlobalStyles";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import * as Animatable from "react-native-animatable";
import { DateTimePicker } from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";



const AddEvent = (props) => {
  const [eventName, setEventName] = useState("")
  const [location, setLocation] = useState("")

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());
  // console.log(moment(eventDate).format("DD,MMM"))

  const [isStartTimePickerVisible, setIsStartTimePickerVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  // console.log(startTime)

  const [isEndTimePickerVisible, setIsEndTimePickerVisible] = useState(false);
  const [endTime, setEndTime] = useState(new Date());

  const [isloading, setIsLoading] = useState(false);



  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    setEventDate(date)
    hideDatePicker();
  };


  const handleSubmit = async () => {
    Keyboard.dismiss()

    if (eventName.length == 0 || location.length == 0) {
      ToastAndroid.show('Enter all details', ToastAndroid.SHORT);
      return;
    }
    const payLoad = {
      name: eventName,
      location: location,
      date: eventDate,
      startTime: startTime,
      endTime: endTime,
      desc:""
    }
    setIsLoading(true)
    let id = await AsyncStorage.getItem('userId')
    // const userData = JSON.parse(user)
    console.log(id)
    console.log(payLoad)

    try {
      const res = await axios.post(`${BASE_URL}/create-event/${id}`, payLoad);
      console.log(res.data)
      setEventName("");
      setLocation("");
      setEventDate(new Date())
      setStartTime(new Date().getTime())
      setEndTime(new Date().getTime())
      setIsLoading(false)
      ToastAndroid.show('Event Added Successfully', ToastAndroid.SHORT);

    }
    catch (error) {
      console.log(error)
      setIsLoading(false);
      if (error.response) {
        console.log(error.response.status)
        if (error.response.status === 422) {
          ToastAndroid.show('This event already exits', ToastAndroid.SHORT);
        }
        else if (error.response.status === 500) {
          ToastAndroid.show("Can't add this event, Error Occured!", ToastAndroid.SHORT);
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
    <View style={[styles.main, { height: "100%" }]}>
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
      <View
        style={{
          marginTop: responsiveHeight(3),
          marginLeft: responsiveWidth(4),
        }}
      >
        <Text
          style={[
            {
              fontFamily: "Poppins_600SemiBold",
              fontSize: responsiveFontSize(4.5),
              color: gStyle.pc,
            },
          ]}
        >
          Add your event
        </Text>
      </View>

      {/* event name */}

      <View style={{ paddingHorizontal: responsiveWidth(4) }}>
        <View style={{ marginBottom: responsiveFontSize(2) }}>
          <Text style={[styles.text]}>Event</Text>
          <TextInput
            placeholder="Enter name of your event"
            style={[styles.textinput]}
            value={eventName}
            onChangeText={(text) => setEventName(text)}
            placeholderTextColor="rgba(255,255,255,0.5)"
            selectionColor="white"
          />
        </View>

        {/* event date */}

        <View style={{ marginBottom: responsiveFontSize(2) }}>
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={[styles.text]}>Date of Event</Text>
            <TextInput
              numberOfLines={1}
              editable={false}
              placeholder="Choose Your Date of Event"
              value={moment(eventDate).format("DD MMMM, YYYY")}
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

        {/* location */}

        <View style={{ marginBottom: responsiveFontSize(2) }}>
          <Text style={[styles.text]}>Location</Text>
          <TextInput
            placeholder="Enter location of your event"
            style={[styles.textinput]}
            value={location}
            onChangeText={(text) => setLocation(text)}
            placeholderTextColor="rgba(255,255,255,0.5)"
            selectionColor="white"
          />
        </View>

        {/* start time */}

        <View style={{ marginBottom: responsiveFontSize(2) }}>
          <TouchableOpacity onPress={() => setIsStartTimePickerVisible(true)}>
            <Text style={[styles.text]}>Start Time</Text>
            <TextInput
              numberOfLines={1}
              editable={false}
              placeholder="Choose the start time of Event"
              value={moment(startTime).format("hh:mm a")}
              style={[styles.textinput]}
            />
            <DateTimePickerModal
              isVisible={isStartTimePickerVisible}
              mode="time"
              onChange={(time) => { setStartTime(time) }}
              value={(time) => { setStartTime(time) }}
              onConfirm={(time) => { setStartTime(time); setIsStartTimePickerVisible(false) }}
              onCancel={() => setIsStartTimePickerVisible(false)}
            />
          </TouchableOpacity>
        </View>

        {/* end time */}
        <View>
          <TouchableOpacity onPress={() => setIsEndTimePickerVisible(true)}>
            <Text style={[styles.text]}>End Time</Text>
            <TextInput
              numberOfLines={1}
              editable={false}
              placeholder="Choose the end time of Event"
              value={moment(endTime).format("hh:mm a")}
              style={[styles.textinput]}
            />
            <DateTimePickerModal
              isVisible={isEndTimePickerVisible}
              mode="time"
              onChange={(time) => { setEndTime(time) }}
              value={(time) => { setEndTime(time) }}
              onConfirm={(time) => { setEndTime(time); setIsEndTimePickerVisible(false) }}
              onCancel={() => { setIsEndTimePickerVisible(false) }}
            />
          </TouchableOpacity>
        </View>

        {/* Add now */}

        <TouchableOpacity onPress={handleSubmit} >
          <Animatable.View
            style={[gStyle.btn]}
            animation={"bounceIn"}
            duration={1000}
            delay={300}
            
          >
            <Text style={[styles.text]}>Add Now</Text>
          </Animatable.View>
        </TouchableOpacity>
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
    color: 'white',
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    padding: responsiveWidth(3),
    borderRadius: responsiveWidth(2),
  },
});


// AddEvent.navigationOptions = {
//   tabBarVisible: false, // Hide bottom navigation for this screen
// };
export default AddEvent