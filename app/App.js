import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import store from './store'

function MainApp() {
    useEffect(() => {
        SplashScreen.hide()
    }, [])
    return (
        <SafeAreaProvider>
              <Provider store={store}>
              <App />
              </Provider>
        </SafeAreaProvider>
    );
}
export default MainApp;