import 'react-native-gesture-handler';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";
import AppNavigator from './src/AppNavigator';
import messaging from '@react-native-firebase/messaging'
import { useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  })
  useEffect(() => {

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log("Notification caused app to open from quit state:", remoteMessage.notification)
        }
      })

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log("Notification caused app to open from background state:", remoteMessage.notification)
    })
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("message handled in the background", remoteMessage)
    })
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    })
    return unsubscribe;
  }, []);
  if (!fontsLoaded) {
    return null;
  }
  const requestUserpermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      console.log("Auth Status:", authStatus);
    }
  }

  if (requestUserpermission()) {
    messaging()
      .getToken()
      .then((token) => {
        console.log(token)
        setfcmtoken(token)
      })
  }
  else {
    console.log("Permission not granted", authStatus);
  }

  const setfcmtoken = async (fcmtoken) => {
    await AsyncStorage.setItem('fcmtoken', `${fcmtoken}`)
  }

  return (
    <AppNavigator />
  )
}

export default App