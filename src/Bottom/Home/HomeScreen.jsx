import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { gStyle } from "../../../GlobalStyles";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import * as Animatable from 'react-native-animatable';



const HomeScreen = (props) => {

  const [query, setQuery] = useState("");
  return (
    <View style={[styles.home]}>
      {/* <ScrollView> */}
      <View style={[styles.top]}>
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image
              style={{ width: responsiveWidth(8), height: responsiveWidth(8) }}
              source={require("../../../assets/images/hamburger.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={{ width: responsiveWidth(8), height: responsiveWidth(8) }}
              source={require("../../../assets/images/user.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: responsiveHeight(3) }}>
          <Animatable.Text animation={'fadeInDown'} duration={800} delay={500} style={[styles.text, { fontFamily: "Poppins_600SemiBold", fontSize: responsiveFontSize(4.5) }]}>
            Manage all{"\n"}your events here !
          </Animatable.Text>
          <View style={{ marginVertical: responsiveHeight(3), flexDirection: "row" }}>
            <TextInput
              placeholder="Search"
              style={[styles.textinput, { flex: 4 }]}
              value={query}
              onChangeText={(text) => setQuery(text)}
              placeholderTextColor="rgba(255,255,255,0.5)"
              selectionColor="white"
            />
            <TouchableOpacity style={[styles.search, { flex: 1 }]}>
              <Image
                source={require("../../../assets/images/search-interface-symbol.png")}
                style={{ width: 30, height: 30, alignSelf: "center", }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.logo]}>
        <Image
          source={require("../../../assets/images/logo-no-background.png")}
          style={{ width: "65%", height: 54, alignSelf: "center" }}
        />
      </View>
      <View style={{ marginBottom: 30 }}>
        <View style={[styles.mid, { flexDirection: "row" }]}>
          <TouchableOpacity style={[styles.block]} onPress={() => { props.navigation.navigate('AddEvent') }}>
            <TouchableOpacity style={[styles.icon]} onPress={() => { props.navigation.navigate('AddEvent') }}>
              <Image
                source={require("../../../assets/images/add.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(2) },
              ]}>
              Add Event
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.block]} onPress={()=>{props.navigation.navigate('MyEvents')}}>
            <TouchableOpacity style={[styles.icon]} onPress={()=>{props.navigation.navigate('MyEvents')}}>
              <Image
                source={require("../../../assets/images/event.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(2) },
              ]}
            >
              My Events
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mid, { flexDirection: "row" }]}>
          <TouchableOpacity style={[styles.block]}>
            <TouchableOpacity style={[styles.icon]}>
              <Image
                source={require("../../../assets/images/contact.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(2) },
              ]}
            >
              Provider
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.block]} onPress={() => { props.navigation.navigate('Member') }}>
            <TouchableOpacity style={[styles.icon]} onPress={() => { props.navigation.navigate('Member') }}>
              <Image
                source={require("../../../assets/images/Members.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.text,
                { fontFamily: "Poppins_400Regular", fontSize: responsiveFontSize(2) },
              ]}>
              Members
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  home: {
    backgroundColor: gStyle.bg,
    flex: 1,
  },
  text: {
    color: "white",
  },
  textinput: {
    color: "white",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: gStyle.bg,
  },
  top: {
    backgroundColor: gStyle.pc,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    padding: 15,
  },
  search: {
    backgroundColor: gStyle.bg,
    alignItems: "baseline",
    justifyContent: "center",
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 1,
    borderLeftWidth: 0,
    // padding: 10,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 30,
  },
  logo: {
    marginVertical: 35,
  },
  mid: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  block: {
    backgroundColor: "#262626",
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    backgroundColor: gStyle.pc,
    padding: 10,
    borderRadius: 50,
    margin: 10,
  },

});

export default HomeScreen;
