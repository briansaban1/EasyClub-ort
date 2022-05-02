import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';
import { AppInput, Button, Header } from '../../components';
import { Space } from '../../components/styled-components';
import styles from './styles';
import WService from '../../service/WebService';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../../utils/fp';

const wservice = new WService();


function DeleteAccountScreen() {
    const profile = useSelector(store => store.user.profile)
    const [credential, setCredential] = useState({
        username: "",
        password: ""
    })
    const [currentUser, setUser] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')
    const [currentRePassword, setCurrentRePassword] = useState('')
    const [loading, setLoading] = useState('')

    async function getCurrentPassword() {
        const credential = await AsyncStorage.getItem('credential')
        if (credential) {
            setCredential(JSON.parse(credential));
        }
    }

    useEffect(() => {
        getCurrentPassword();
    }, [])

    function handleDeleteAccount() {
        setLoading(true);

//falta realizar el DELETE en cascada desde la API

        wservice.deleteAccount(safeGetOr('', 'id_usuario')(profile), (currentPassword))
            .then(async (response) => {
                console.log({})
                console.log({ response })
                if (response.status == 1) {


                    await AsyncStorage.removeItem('profile');
                    reset('Login');
                    setTimeout(() => {
                        dispatch({ type: ActionTypes.LOG_OUT });
                    }, 500);


                }
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
            })
    }
    const allow = credential.password == currentPassword && credential.password == currentRePassword && credential.username == currentUser
    return (
        <View style={styles.container}>
            <Header
                title={"Eliminar cuenta"}
                description={"Solicitud de arrepentimiento"}
            />
            <View style={{ marginTop: 20 }}></View>
            <AppInput
                label={'Nombre de usuario'}
                onChangeText={setUser}
                value={currentUser}
            />
            <AppInput
                password
                label={'Contraseña'}
                onChangeText={setCurrentPassword}
                value={currentPassword}
            />
            <AppInput
                password
                label={'Confirmar Contraseña'}
                onChangeText={setCurrentRePassword}
                value={currentRePassword}
            />
            <Space height={30} />
            <Button
                loading={loading}
                disabled={!allow}
                text={"Aceptar"}
                onPress={handleDeleteAccount}
            />
        </View>
    );
}

export default DeleteAccountScreen;
