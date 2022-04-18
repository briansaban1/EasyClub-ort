import React, { useState, Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    YellowBox,
    WebTouchableOpacity,
    CheckBox,
    Alert, 
    BackHandler,
    Dimensions,
    KeyboardAvoidingView,
    Linking,
    ScrollView
  } from 'react-native';
import { Header, Button, AppInput } from '../../components';
import { Divider, FlexWrapper, Space } from '../../components/styled-components';
import Item from './Item';
import styles from './styles';
import { Title } from '../../components/Header';
import data from './data'
import FAQItem from './FAQ-Item';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../store/user/action';
    
this.state = {
    item_index: 0,
    title: ['COTIZACIÓN DE ENVÍO', 'ALMACENAMIENTO', 'INFORMACIÓN PAQUETES', 'CONSULTAS EN GENERAL', 'BOX'],
    asunto: ['Cotización de Envío', 'Cotización Almacenamiento Mercadería', 'Información sobre Paquetes', 'Consultas en General', ''],
    nombre: '',
    mail: '',
    msg: '',
    rerender: '',
    user_profile: [],
  }

handleName = (text) => {
    this.setState({ nombre: text })
  }
  handleEmail = (text) => {
    this.setState({ mail: text })
  }
  handleAsunto = (text) => {
    //this.state.asunto[2] = text;
    this.setState({ asunto: text })
  }
  handleMsg = (text) => {
    this.setState({ msg: text })
  }




export const _send_msg=(nombre, mail, asunto, msg) => {
    //alert(name+";"+email+";"+asunto+";"+msg)
    if (nombre == '') return Alert.alert(
      '¡Atención!',
      'Por favor escribí tu Nombre y Apellido',
      [

        { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
      ]
    );
    if (mail == '') return Alert.alert(
      '¡Atención!',
      'Por favor escribí tu correo electrónico',
      [

        { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
      ]
    );
    if (asunto == '') return Alert.alert(
      '¡Atención!',
      'Por favor escribí un Asunto',
      [

        { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
      ]
    );
    if (msg == '') return Alert.alert(
      '¡Atención!',
      'Por favor escribí el mensaje',
      [

        { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
      ]
    );
    fetch('http://tododelmundo.com.ar/app/contactus.php', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        flag: 'contactus',
        mail: mail,
        asunto: asunto,
        mensaje: msg,
        nombre: nombre

      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 1) {
          this.state.nombre = "";
          this.state.mail = "";
          this.state.msg = "";
          Alert.alert(
            '¡Mensaje Enviado!',
            'En breve estaremos respondiendo tu consulta, recordá revisar la bandeja de correo no deseado',
            [

              { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
            ]
          );
          this.setState({ nombre: '', mail: '', msg: '' })

        } else {
          Alert.alert(
            '¡Atención!',
            'Network error',
            [

              { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
            ]
          );
        }

      })
      .catch((error) => {
        console.error(error);
      });

  };

function PoliticasScreen() {
    const [selected, setSelected] = useState(null);
    function openURL(url) {
        Linking.openURL(url)
    }

    
    const [email, setEmail]=useState('')
    const _profile = useSelector(store => store.user.profile);
    const [profile, setProfile] = useState(_profile);
    const [newEmail, setNewEmail]=useState('')
    const [loading, setLoading] = useState('')



      async function handleUpdateProfile() {
        setLoading(true);
        try {
           await dispatch(updateProfile(profile));
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }

    
    


    return (
        <View style={styles.container}>
            <Header
                title={"Contacto"}
                
            />
            <ScrollView contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            
            <AppInput
                label={'Nombre y Apellido'}
                
                
                onChangeText={this.handleName}
               
              value={this.state.nombre}

            />
            <AppInput
                label={'Email'}
                value={this.state.mail}
                
                onChangeText={this.handleEmail}
            />
            <AppInput
                label={'Asunto'}
                //onChangeText={setNewEmail}
                value={'Información sobre tarifas'[this.state.asunto]}
                onChangeText={this.handleAsunto}
                //onChangeText={(text) => { setProfile({ asunto: text }) }}
                //value={safeGetOr('', 'tx_nombre')(profile)}
            />
            <AppInput
                label={'Mensaje'}
                //onChangeText={setNewEmail}
                onChangeText={this.handleMsg}
                
                height={120}
                style={{alignItems: 'bottom', justifyContent: 'bottom',}}
                multiline={true}
                value={this.state.msg}
            />
             <Space height={30} />
            <Button
                loading={loading}
                text={"Enviar Mensaje"}
                onPress={() => { this._send_msg(this.state.nombre, this.state.mail, this.state.asunto, this.state.msg) }}

            />
            
            
            
        </ScrollView>

        </View>
    );
}

export default PoliticasScreen;
