
import React, { Component, useEffect } from 'react';
import { Platform, StyleSheet, UIManager, Text, TextInput, View, StatusBar, Dimensions , LogBox, SafeAreaView} from 'react-native';
// import AppMain from './src/App';
import AppMain from './app/App';
import DropdownAlert from 'react-native-dropdownalert';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import { Colors } from './app/constants';
import FlashMessage from 'react-native-flash-message';
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};

LogBox.ignoreAllLogs()

function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  async function getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    } else {
      // To do
    }
  }
  useEffect(() => {
    requestUserPermission();
    getToken();
    const unsubscribeMessaging = messaging().onMessage(
      async (remoteMessage) => {
        console.log({ remoteMessage });
      },
    );

    return () => {
      unsubscribeMessaging();
    };
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'#00000025'} />
      <AppMain />
      <FlashMessage floating position="top" />
    </View>
  )
}

export default App


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.lightbackground
  },

});
