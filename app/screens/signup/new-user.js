import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, Text, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppInput, Header, ImageButton, Button } from '../../components';
import { updateRegisterProfile } from '../../store/user/action';
import styles from './styles';
import Images from '../../constants/images';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';


import WService from '../../service/WebService';
import { isValidUsername, isValidEmail } from '../../utils';
const wservice = new WService();

function NewUserScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [attempted, setAttempted] = useState({
    username: false,
    correo: false
  })
  const [errors, setErrors] = useState({
    username: true,
    correo: true
  })
  const profile = useSelector(store => store.user.registerProfile);


  function checkAttribute(type, value) {
    wservice.checkExistingUser(`tx_${type}`, value)
      .then(response => {
        setAttempted({
          ...attempted,
          [type]: true
        })
        setErrors({
          ...errors,
          [type]: response.status == 'valid' ? false : true
        })
        if (response.status == 'valid') {
          updateProfile({ [type]: value })
        }
      })
  }


  function updateProfile(prop) {
    dispatch(updateRegisterProfile({ ...profile, ...prop }))
  }


  function validar_clave() {
    if (password.length >= 1) {
      var mayuscula = false;
      for (var i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 65 && password.charCodeAt(i) <= 90) {
          mayuscula = true;
        }
      } if (mayuscula == true) {
        return true;
      }
    } return false;
  }

  function validar_claveMin() {
    if (password.length >= 1) {
      var mayuscula = false;
      for (var i = 0; i < password.length; i++) {
        if (password.charCodeAt(i) >= 97 && password.charCodeAt(i) <= 122) {
          mayuscula = true;
        }
      } if (mayuscula == true) {
        return true;
      }
    } return false;
  };

  console.log(validar_clave());


  const mayuscula = Boolean(validar_clave());
  const minuscula = Boolean(validar_claveMin());
  const min = Boolean(password.length > 7)

  console.log(mayuscula)
  console.log(minuscula)
  console.log(min)


  const allow = !errors.username && !errors.correo && confirmPassword == password && Boolean(mayuscula) && Boolean(minuscula) && Boolean(min);
  console.log({
    allow,
    password,
    confirmPassword,
    errors
  })
  return (
    <ScrollView style={styles.container}>

      <View>
        <SafeAreaView />
        <Header title={"Nuevo Usuario"} description={'Creá tu cuenta ahora.'} />
        <AppInput
          label={'Nombre de Usuario'}
          onChangeText={(text) => {
            
            setUsername(text.trim())
            if (isValidUsername(text)) {
              checkAttribute('username', text)
            } else {
              setErrors({
                ...errors,
                username: true
              })
            }
          }}
          value={username}
          errorMessage={errors.username}
          containerStyle={{ marginTop: 40 }}
        />
        <AppInput
          label={'E-mail'}
          onChangeText={(text) => {
            setEmail(text.trim())
            if (isValidEmail(text)) {
              checkAttribute('correo', text)
            } else {
              setErrors({
                ...errors,
                correo: true
              })
            }
          }}
          errorMessage={errors.email}
          value={email}
        />
        <AppInput
          password
          label={'Contraseña'}
          //onChangeText={(text) => updateProfile({ password: text })}
          onChangeText={(text) => {
            setPassword(text.trim())
            if (mayuscula && min && minuscula) {
              updateProfile({ password: text })
            } else {
              setErrors({
                ...errors,
                password: true
              })
            }
          }}

          value={password}
        />
        <AppInput
          password
          label={'Repetir Contraseña'}
          onChangeText={(text) => {setConfirmPassword(text.trim())}}
          value={confirmPassword}
        />

        <View style={{ paddingHorizontal: 35, marginTop: 25 }}>
          <Text style={!minuscula ? styles.texto : styles.texto_cambio}><Image
            source={!minuscula ? require('@assets/punto1.png') : require('@assets/punto2.png')}
            style={styles.headerIcon_new}
          /> Una minúscula</Text>
          <Text style={!mayuscula ? styles.texto : styles.texto_cambio}><Image
            source={!mayuscula ? require('@assets/punto1.png') : require('@assets/punto2.png')}
            style={styles.headerIcon_new}
          /> Una mayúscula</Text>
          <Text style={!min ? styles.texto : styles.texto_cambio}><Image
            source={!min ? require('@assets/punto1.png') : require('@assets/punto2.png')}
            style={styles.headerIcon_new}
          /> Mínimo 8 caracteres</Text>
        </View>

        <Button
          disabled={!allow}
          loading={loading}
          text={'Continuar'}
          onPress={() => { navigate(Screens.SignupData) }}

        />
        <View style={{ height: 35 }}></View>
      </View>

    </ScrollView>
  );
}

export default NewUserScreen;
