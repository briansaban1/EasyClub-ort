import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppInput, Header, ImageButton, Button } from '../../components';
import { updateRegisterProfile } from '../../store/user/action';
import styles from './styles';
import Images from '../../constants/images';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';
import { FlexBetweenWrapper, Space, FlexWrapper, AppText, CenterText } from '../../components/styled-components';
import { loginUser, autoLogin } from '../../store/user/action'

import WService from '../../service/WebService';
import { isValidUsername, isValidEmail } from '../../utils';
const wservice = new WService();

function ChangePassScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation()


  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailconfirm, setEmailConfirm] = useState('');

  const [loading, setLoading] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [attempted, setAttempted] = useState({
    correoconfirm: false,
    correo: false
  })
  const [errors, setErrors] = useState({
    correoconfirm: true,
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

  const allow = email == emailconfirm && Boolean(email.length > 10);

  console.log({
    allow,
    email,
    emailconfirm,
    errors
  })


  function recuPass() {
    setLoading(true)
    if (email == emailconfirm) {

      fetch('https://easyclub.online/app/recoverypassword.php', {
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          flag: 'recoverypassword',
          email: email
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == 1) {
            Alert.alert(
              '¡Atención!',
              'Si el email ingresado se encuentra registrado, recibirás un correo con tu nueva contraseña',
              [

                { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
              ]
            );
            setEmail('')
            setEmailConfirm('')
            setLoading(false)

          } else {
            Alert.alert(
              '¡Atención!',
              'Si el email ingresado se encuentra registrado, recibirás un correo con tu nueva contraseña',
              [

                { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
              ]
            );
            setLoading(false)
          }

        })
        .catch((error) => {
          console.error(error);
        });


    } else {
      Alert.alert(
        '¡Atención!',
        'Por favor confirmá tu mail',
        [

          { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
        ]
      );
      setLoading(false)
    }

  }



  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Header
        title={"Recuperar Contraseña"}
        description={' '}
      />

      <AppInput
        label={'Ingresá tu Email'}
        onChangeText={(text) => {
          setEmail(text)
          if (isValidEmail(text)) {
            checkAttribute('correo', text)
          } else {
            setErrors({
              ...errors,
              correo: true
            })
          }
        }}
        value={email}
      />
      <AppInput
        label={'Confirmá tu Email'}
        onChangeText={(text) => {
          setEmailConfirm(text)
          if (isValidEmail(text)) {
            checkAttribute('correoconfirm', text)
          } else {
            setErrors({
              ...errors,
              correoconfirm: true
            })
          }
        }}
        value={emailconfirm}
      />

      <Space height={20} />
      <Button
        disabled={!allow}
        loading={loading}
        text={'Aceptar'}
        onPress={recuPass}
      />
    </View>
  );
}

export default ChangePassScreen;
