import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, Alert, ScrollView, Platform } from 'react-native';
import CheckBox from 'react-native-check-box'
import Images from '../../constants/images';
import styles from './styles';
import { AppInput, Button } from '../../components';
import { FlexBetweenWrapper, Space, FlexWrapper, AppText, CenterText, Divider } from '../../components/styled-components';
import { Colors } from '../../constants';
import { loginUser, autoLogin } from '../../store/user/action'
import { useDispatch } from 'react-redux';
import { reset } from '../../navigation/RootNavigation'
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';
import { openTermsOfService } from '../../utils';
import { LoginButton, AccessToken, Profile, GraphRequest,GraphRequestManager } from 'react-native-fbsdk-next';

function initUser(token) {
  fetch('https://graph.facebook.com/v2.5/me?fields=first_name,last_name&access_token=' + token)
  .then((response) => response.json())
  .then(data => {
    console.log(data)
    console.log(data.first_name)
    useNavigation(Screens.CreateActivity)
  })
}


function LoginScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  useEffect(() => {
    dispatch(autoLogin());
  }, [])

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isChecked, setChecked] = useState(false);

  async function login() {
    setLoading(true)
    try {
      await dispatch(loginUser({ username, password }, isChecked))
      setLoading(false)

    }
    catch (e) {
      setLoading(false);
      Alert.alert(
        "¡Atención!",
        "Por favor ingresá correctamente tu usuario y contraseña",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );

    }
  }

  return (
    <ScrollView style={styles.container}>
    <View style={styles.container}>
      <SafeAreaView style={{marginTop: Platform.OS == 'android' ? 40 : 15}} />
      <Image
        style={styles.logo}
        source={Images.Logo}
      />
      <Text style={styles.welcome}>{"Bienvenido!"}</Text>
      <Text style={styles.description}>{"Por favor Iniciá Sesión o creá\ntu cuenta."}</Text>
      <AppInput
        label={'Nombre de Usuario'}
        onChangeText={setUsername}
        value={username}
        containerStyle={{ marginTop: 40 }}
      />
      <AppInput
        password
        label={'Contraseña'}
        onChangeText={setPassword}
        value={password}
      />
      
      <FlexBetweenWrapper paddingHorizontal={30}>
        <FlexWrapper>
          <CheckBox
            onClick={() => {
              setChecked(!isChecked)
            }}
            isChecked={isChecked}
            style={{ marginRight: 5, }}
          />
          <AppText >{'Recordarme'}</AppText>
        </FlexWrapper>
        <TouchableOpacity
          onPress={() => { navigate(Screens.Pass) }}
        >
          <AppText >{'¿Olvidaste la contraseña?'}</AppText>
        </TouchableOpacity>
      </FlexBetweenWrapper>
      <Space height={20} />
      <Button
        disabled={!Boolean(username) || !Boolean(password)}
        loading={loading}
        text={'Iniciar Sesión'}
        onPress={login}
      />
      <LoginButton
          onLoginFinished={
            (error, result) => {
              console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                    const { accessToken } = data
                    initUser(accessToken)
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
      <Button
        buttonStyle={styles.createAcc}
        textColor={Colors.darkblue}
        text={'Crear una Cuenta'}
        onPress={() => { navigate(Screens.NewUser) }}
      />
      <CenterText style={{ fontSize: 10, margin: 30 }} >{'Con tu registro estás aceptando nuestros '}
        {<AppText
          color={Colors.blue}
          style={{ fontSize: 12 }}
          onPress={() => { openTermsOfService() }}
        >{"Términos & Condiciones."}</AppText>}
      </CenterText>
    </View>
    </ScrollView>
  );
}

export default LoginScreen;
