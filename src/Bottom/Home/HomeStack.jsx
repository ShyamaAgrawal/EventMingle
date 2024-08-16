import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator,TransitionPresets } from "@react-navigation/native-stack";
import HomeScreen from './HomeScreen';
import AddEvent from './AddEvent';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import Member from './Member';
import AddMember from './AddMember';
import MyEvents from './MyEvents';
import Event from './Event';
import AddTask from './AddTask';
import Task from './Task';
import IndividualMember from './IndividualMember';
import MemPortal from './MemPortal';
import MainLoading from './MainLoading';

const Stack = createStackNavigator();


const HomeStack = () => {
     

    return (
        <>

            <Stack.Navigator
                initialRouteName="MainLoading"
                screenOptions={{
                    headerShown: false,
                    ...TransitionPresets.ModalTransition, // Customize the transition preset
                }}>
                <Stack.Screen name="MainLoading" component={MainLoading} />

                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="AddEvent" component={AddEvent} />
                <Stack.Screen name="Member" component={Member} />
                <Stack.Screen name="AddMember" component={AddMember} />
                <Stack.Screen name="MyEvents" component={MyEvents} />
                <Stack.Screen name="Event" component={Event} />
                <Stack.Screen name="AddTask" component={AddTask} />
                <Stack.Screen name="Task" component={Task} />
                <Stack.Screen name="IndividualMember" component={IndividualMember} />
                <Stack.Screen name="MemPortal" component={MemPortal} />


            </Stack.Navigator>
        </>
    )
}

export default HomeStack


