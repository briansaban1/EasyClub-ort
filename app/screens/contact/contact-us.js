import React, { useState, useEffect } from 'react';
import { Linking, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Header, Button, AppInput } from '../../components';
import { Divider, FlexWrapper } from '../../components/styled-components';

import styles from './styles';
import { Title } from '../../components/Header';

import { safeGetOr } from '../../utils/fp';
import { useSelector } from 'react-redux';
import WService from '../../service/WebService';
import { localMessage } from '../../utils';
import { useNavigation } from '@react-navigation/native';


const wservice = new WService();


function ContactUsScreen({ route }) {
    const { goBack } = useNavigation();
    const label = safeGetOr("", "params.label")(route);
    const profile = useSelector(store => store.user.profile)
    const [loading, setLoading] = useState(false);
    const [nombre, setNombre] = useState(profile?.tx_nombre);
    const [email, setEmail] = useState(profile?.tx_correo);
    const [asunto, setAsunto] = useState('');
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        setAsunto(label)
    }, [label])

    function sendMessage() {
        setLoading(true)
        wservice.contactus({
            nombre, email, asunto, mensaje
        }).then(response => {
            setLoading(false);
            if (response.status == 1) {
                localMessage("Hemos enviado tu mensaje con éxito!", true);
                setMensaje('');
                setTimeout(() => {

                }, 1000);
            }
        }).catch(e => { setLoading(false) })
    }

    const allow = nombre && email && asunto && mensaje
    return (

      <ScrollView style={styles.container}>
        <View >
            <Header
                title={"Contacto"}
                description={"¿Alguna duda? Contactanos"}
            />
            <View style={{marginTop:20}}>
            <AppInput
                label={'Normbre y Apellido'}
                onChangeText={setNombre}
                value={nombre}
            />
            <AppInput
                label={'Email'}
                onChangeText={setEmail}
                value={email}
            />
            <AppInput
                label={'Asunto'}
                onChangeText={setAsunto}
                value={asunto}
            />
            <AppInput
                label={'Mensaje'}
                onChangeText={setMensaje}
                value={mensaje}
                multiline
            />
            <Button
                disabled={!Boolean(allow)}
                loading={loading}
                text={'Enviar Mensaje'}
                onPress={sendMessage}
                multiline={true}
                autoCapitalize="words"
                placeholderstyle={{ alignItems: 'bottom', justifyContent: 'bottom', }}
            />
            </View>
        </View>
        <View style={{marginTop:25}}></View>
        </ScrollView >
    );
}

export default ContactUsScreen;