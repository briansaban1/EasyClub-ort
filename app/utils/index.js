import { Linking } from 'react-native'
import {showMessage} from 'react-native-flash-message';

export const localMessage = (
    message ,
    success = false,
    duration = 3000,
  ) =>
    showMessage({
      message: message,
      icon: success ? 'success' : 'danger',
      type: success ? 'success' : 'danger',
      duration,
    });

export const openTermsOfService = () => {
    const url = "https://easyclub.000webhostapp.com/politicas/"
    Linking.openURL(url)
}

export const isValidEmail = (value) => {
    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? false : true
}
export const isValidUsername = (value) =>{
    return value && !/^[A-Z0-9._%+-]{6,35}$/i.test(value) ? false : true
}
