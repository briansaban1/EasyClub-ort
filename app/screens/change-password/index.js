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


function ChangePasswordScreen() {
    const profile = useSelector(store => store.user.profile)
    const [credential, setCredential] = useState({
        username: "",
        password: ""
    })
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPass, setNewPass] = useState('')
    const [newRePass, setNewRePass] = useState('')
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

    function handleChangePassword() {
        setLoading(true);
        wservice.changePassword(safeGetOr('', 'tx_correo')(profile), newPass)
            .then(async (response) => {
                console.log({ response })
                if (response.status == 1) {
                    const newCredential = { username: credential.username, password: newPass };
                    setCredential(newCredential);
                    await AsyncStorage.setItem('credential', JSON.stringify(newCredential))
                }
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
            })
    }
    const allow = credential.password == currentPassword && newPass == newRePass && newRePass.length > 4
    return (
        <View style={styles.container}>
            <Header
                title={"Contraseña"}
                description={"Modificá tus datos"}
            />
            <Space />
            <AppInput
                password
                label={'Contraseña actual'}
                onChangeText={setCurrentPassword}
                value={currentPassword}
            />
            <AppInput
                password
                label={'Nueva contraseña'}
                onChangeText={setNewPass}
                value={newPass}
            />
            <AppInput
                password
                label={'Repetir Contraseña'}
                onChangeText={setNewRePass}
                value={newRePass}
            />
            <Space height={30} />
            <Button
                loading={loading}
                disabled={!allow}
                text={"Guardar cambios"}
                onPress={handleChangePassword}
            />
        </View>
    );
}

export default ChangePasswordScreen;
