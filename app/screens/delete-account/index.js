import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View } from 'react-native';
import { AppInput, Button, Header } from '../../components';
import { Space } from '../../components/styled-components';
import styles from './styles';
import WService from '../../service/WebService';
import { safeGetOr } from '../../utils/fp';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../store/user/action';


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

    const dispatch = useDispatch();


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

//se coloca el usuario en tipo 3 para que no pueda acceder y se cierra la sesion.

        wservice.deleteAccount(profile.id_usuario, currentPassword)
            .then(async (response) => {
                console.log({})
                console.log(response.status, response )
                if (response.status == 1) {

                    dispatch(logoutUser());

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
    const allow = credential.password == currentPassword && credential.password == currentRePassword && profile.tx_username == currentUser
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
                autoCapitalize={'none'}
            />
            <AppInput
                password
                label={'Contraseña'}
                onChangeText={setCurrentPassword}
                value={currentPassword}
                autoCapitalize={'none'}
            />
            <AppInput
                password
                label={'Confirmar Contraseña'}
                onChangeText={setCurrentRePassword}
                value={currentRePassword}
                autoCapitalize={'none'}
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
