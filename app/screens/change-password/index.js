import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AppInput, Button, Header } from '../../components';
import { Space, AppText } from '../../components/styled-components';
import styles from './styles';
import WService from '../../service/WebService';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import { View, ScrollView, SafeAreaView, Modal, TouchableOpacity, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';


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
    const [modalVisible, setModalVisible] = useState(false);

//se obtiene la clave actual
    async function getCurrentPassword() {
        const credential = await AsyncStorage.getItem('credential')
        if (credential) {
            setCredential(JSON.parse(credential));
        }
    }

    useEffect(() => {
        getCurrentPassword();
    }, [])


//se pasa por parametro el id del usuario y la nueva clave en caso que las claves actuales coincidan
//con las ingresadas. En caso que el status sea 1 se vuelven a setear las nuevas credenciales del usuario.

    function handleChangePassword() {
        setLoading(true);
        wservice.changePassword(profile.id_usuario, newPass)
            .then(async (response) => {
                console.log({ response })
                if (response.status == 1) {
                    const newCredential = { username: credential.username, password: newPass };
                    setCredential(newCredential);
                    await AsyncStorage.setItem('credential', JSON.stringify(newCredential))
                }
                setLoading(false);
                setModalVisible(true);
                setNewRePass('');
                setNewPass('');
                setCurrentPassword('');
                
            })
            .catch(e => {
                setLoading(false);
                setModalVisible(false);
            })
    }

    console.log(currentPassword, newPass, newRePass, credential.password, 'datos' )

    const allow = credential.password == currentPassword && newPass == newRePass && newRePass.length > 4
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            <SafeAreaView />
            <View >
            <Header
                title={"Contraseña"}
                description={"Modificá tus datos"}
            />
            <Space />
            <Space />
            <AppInput
                password
                label={'Contraseña actual'}
                autoCapitalize={'none'}
                onChangeText={setCurrentPassword}
                value={currentPassword}
            />
            <AppInput
                password
                label={'Nueva contraseña'}
                autoCapitalize={'none'}
                onChangeText={setNewPass}
                value={newPass}
            />
            <AppInput
                password
                label={'Repetir Contraseña'}
                autoCapitalize={'none'}
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
         <Modal
         animationType="slide"
         transparent={true}
         style={styles.modal}
         visible={modalVisible}
     >
         <StatusBar backgroundColor="#00000040" barStyle="light-content" />

         <View style={styles.modal}>
             <View style={styles.modalContainer}>
                 <AppText style={styles.title1}>¡Datos Actualizados!</AppText>
                 <View style={styles.hr} />

                 <View style={styles.flexContainer1}>
                     <LottieView source={require('@assets/check.json')}
                         autoPlay={true}
                         loop={false}
                         resizeMode="cover" 
                         style={{ width: 110, height: 110, marginVertical: 7, alignSelf: 'center' }}
                     />


                 </View>


                 <TouchableOpacity style={styles.button1}
                     onPress={() => setModalVisible(!modalVisible)}
                 >
                     <AppText style={styles.text1}>Aceptar</AppText>
                 </TouchableOpacity>




             </View>
         </View>
     </Modal>

        </ScrollView>

    );
}

export default ChangePasswordScreen;
