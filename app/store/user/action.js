import { ActionTypes } from '../ActionTypes';
import Splash from 'react-native-splash-screen';
import WService from '../../service/WebService';
import AsyncStorage from '@react-native-community/async-storage';
import { goBack, reset } from '../../navigation/RootNavigation';
import { Alert } from 'react-native';
import Screens from '../../constants/screens';
import messaging from '@react-native-firebase/messaging';


const wservice = new WService();

export const loginUser = ({ username, password }, rememberMe = false) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_START });
    const response = await wservice.login(username, password)
    console.log('login-[response]', response)
    if (response.status == 1) {
      const resumen = response.data.id_TipoUsuario == 2 ? await wservice.getUserMenu(response.data.id_usuario) : await wservice.getAdminMenu()
      console.log(resumen)
      if (rememberMe) {
        await AsyncStorage.setItem('profile', JSON.stringify(response.data));
        await AsyncStorage.setItem('credential', JSON.stringify({ username, password }));
      }
      const payload = { profile: response.data, resumen }
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload });
      reset('MainApp')
    } else {
      Alert.alert(
        "¡Atención!",
        "Por favor ingresá correctamente tu usuario y contraseña",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      dispatch({ type: ActionTypes.LOGIN_FAILED });
      
    }
  };
};

export const registerUser = (profile) => {
  return async (dispatch) => {
    console.log(profile, 'flag action')
    const response0 = await wservice.register(profile)
    if (response0.status == 1) {
      console.log(response0.msg)
      await AsyncStorage.removeItem('profile');
      reset('Exito');
    }
  };
};

export const autoLogin = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_START });
    const profileData = await AsyncStorage.getItem('profile');
    if (profileData) {
      const profile = JSON.parse(profileData)
      const resumen = profile.id_TipoUsuario == 2 ? await wservice.getUserMenu(profile.id_usuario) : await wservice.getAdminMenu()
      const payload = { profile, resumen }
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload });
      reset('MainApp')
      setTimeout(() => {
        Splash.hide()
      }, 300);
    } else {
      dispatch({ type: ActionTypes.LOGIN_FAILED });
      Alert.Alert("Por favor ingresá correctamente tu usuario y contraseña");
      Splash.hide()
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem('profile');
    reset('Login');
    setTimeout(() => {
      dispatch({ type: ActionTypes.LOG_OUT });
    }, 500);
  };
};


export const mytoken = (id) => {
  //console.log(id, 'tokeeennn')
return async (dispatch) => {
  try{
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
    userTokenRegister(id, fcmToken)
  } else {
    userTokenRegister(id, fcmToken)
  } 
} catch (error){
  dispatch({ type: ActionTypes.GET_ACTIVIDADES_FAILED });

}
};
};

 userTokenRegister = (id, token) => {
  //console.log(token, 'tokeeen')
  fetch('https://easyclubort.000webhostapp.com/app/userTokenRegister.php', {
    method: 'POST',
    header: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      flag: 'userTokenRegister',
      id: id,
      token: token

    })
  })
    .then((response) => response.json(
    ))
    .then((responseJson) => {       
    })
    .catch((error) => {
     
    });
   
};


export const getSubmissions = (email) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_SUBMISSIONS_START });
      const data = await wservice.getSubmissions(email)
      console.log(data)
      if (data.status == 1){
        
        dispatch({ type: ActionTypes.GET_SUBMISSIONS_SUCCESS, payload: data.data });
      }
        dispatch({ type: ActionTypes.GET_SUBMISSIONS_FAILED });
  };
};

export const getSubmissions1 = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_SUBMISSIONS1_START });
      const data = await wservice.getSubmissions1(id)
      console.log(data)
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_SUBMISSIONS1_SUCCESS, payload: data.data });
       } 
      dispatch({ type: ActionTypes.GET_SUBMISSIONS1_FAILED });
    
  };
};

export const getActividades = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_ACTIVIDADES_START });
      const data = await wservice.getActividades()
      
      console.log(data, "ACAAAA")
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_ACTIVIDADES_SUCCESS, payload: data.data });
       } 
      dispatch({ type: ActionTypes.GET_ACTIVIDADES_FAILED });
    
  };
};

export const getHorarios = (actividad) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_HORARIOS_START });
      const data = await wservice.getHorarios(actividad)
      console.log(data, "ACAAAA")
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_HORARIOS_SUCCESS, payload: data.data });
       } 
      dispatch({ type: ActionTypes.GET_HORARIOS_FAILED });
    
  };
};


export const getGrafico = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_GRAFICO_START });
      const data = await wservice.getGrafico()
      console.log(data)
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_GRAFICO_SUCCESS, payload: data.data });
       } 
      dispatch({ type: ActionTypes.GET_GRAFICO_FAILED });
    
  };
};

export const getDescuento = (email) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_DESCUENTO_START });
      const data = await wservice.getDescuento(email)
      console.log(data)
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_DESCUENTO_SUCCESS, payload: data.data });
       } 
      dispatch({ type: ActionTypes.GET_DESCUENTO_FAILED });
    
  };
};

export const getPuntos = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_PUNTOS_START });
      const data = await wservice.getPuntos(id)
      console.log(data)
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_PUNTOS_SUCCESS, payload: data.data });
    } 
      dispatch({ type: ActionTypes.GET_PUNTOS_FAILED });
    
  };
};

export const getWallet = (email, username) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_WALLET_START });
      const data = await wservice.getWallet(email, username)
      console.log(data)
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_WALLET_SUCCESS, payload: data.data });
    } 
      dispatch({ type: ActionTypes.GET_WALLET_FAILED });
    
  };
};

export const getPromociones = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_PROMOCIONES_START });
      const data = await wservice.getPromociones()
      console.log(data)
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_PROMOCIONES_SUCCESS, payload: data.data });
    } 
      dispatch({ type: ActionTypes.GET_PROMOCIONES_FAILED });
    
  };
};


export const getFacturas = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_FACTURAS_START });
   
      const data = await wservice.getFacturas(id)
      console.log(data)
      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_FACTURAS_SUCCESS, payload: data.data });
    } 
      dispatch({ type: ActionTypes.GET_FACTURAS_FAILED });
    
  };
};


export const updateProfile = (profile) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_PROFILE_START });
    try {
      await wservice.updateProfile(profile)
      await AsyncStorage.setItem('profile', JSON.stringify(profile));
      dispatch({ type: ActionTypes.UPDATE_PROFILE_SUCCESS, payload: profile });
    } catch (error) {
      dispatch({ type: ActionTypes.UPDATE_PROFILE_FAILED });
    }
  };
};
export const updateRegisterProfile = (profile) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.UPDATE_REGISTER_PROFILE, payload: profile });
  };
};

export const getUserMenu = (id_usuario) => {
  console.log(id_usuario)
  return async (dispatch) => {
    const profileData = await AsyncStorage.getItem('profile');
    const profile = JSON.parse(profileData)
    const resumen = await wservice.getUserMenu(profile.id_usuario)
    const payload = { profile, resumen }
    console.log(payload);
    dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload });
  };
};

export const cancelarReserva = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.PUT_CANCELAR_RESERVA, payload: id });
  };
};

export const getUsuarios = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GET_USUARIOS_START });
      const data = await wservice.getUsuarios()

      if (data.status == 1){
      dispatch({ type: ActionTypes.GET_USUARIOS_SUCCESS, payload: data.data });
       } 
      dispatch({ type: ActionTypes.GET_USUARIOS_FAILED });
    
  };
};

export const getAdminMenu = () => {
  return async (dispatch) => {
    const profileData = await AsyncStorage.getItem('profile');
    const profile = JSON.parse(profileData)
    const resumen = await wservice.getAdminMenu()
    const payload = { profile, resumen }
    dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload });
  };
};

export const getReporteGanancias = () => {
  return async (dispatch) => {
    const ganancias = await wservice.getReporteGanancias()
    dispatch({ type: ActionTypes.REPORTE_SUCCESS, payload: ganancias.data });
  };
};