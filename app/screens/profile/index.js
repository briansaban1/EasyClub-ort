import React, { useState } from 'react';
import { View, ScrollView, SafeAreaView, Modal, TouchableOpacity, StatusBar } from 'react-native';
import { Button, UserAvatar, ImageButton, AppInput, Header } from '../../components';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { Images, Colors, Dimensions } from '../../constants';
import { Space, FlexWrapper, AppText, FlexBetweenWrapper, FlexBetweenWrapper_perfil, FlexWrapperPerfil } from '../../components/styled-components';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import WService from '../../service/WebService';

import { updateProfile } from '../../store/user/action';
import LottieView from 'lottie-react-native';

const wservice = new WService();



const BoldText = styled(AppText)`
     color:${Colors.darkblue};
     font-size:15px;
     font-weight:bold;
     margin-right:5px;
    `



function ProfileScreen() {
    const { canGoBack, goBack } = useNavigation();
    const dispatch = useDispatch();
    const _profile = useSelector(store => store.user.profile);
    const [profile, setProfile] = useState(_profile);
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);


    async function handleUpdateProfile() {

        setLoading(true);

        try {
            await dispatch(updateProfile(profile));
            setLoading(false);
            setModalVisible(true)

        } catch (error) {
            setLoading(false);
            setModalVisible(false)
        }
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            <SafeAreaView />
            <View >
                <Header
                    title={"Mi Perfil"}
                />
                <Space />
                <View style={styles.fondo_up}>
                    <FlexBetweenWrapper_perfil>

                        <UserAvatar />
                        <View style={styles.mainInfo}>
                        <FlexWrapperPerfil>
                                <BoldText>{"Usuario:"}</BoldText>
                                <AppText>{safeGetOr('', 'tx_username')(profile)}</AppText>
                            </FlexWrapperPerfil>
                            <FlexWrapperPerfil style={{ marginTop: 2,}}>
                                <BoldText>{"ID:"}</BoldText>
                                <AppText>{safeGetOr('', 'id_usuario')(profile)}</AppText>
                            </FlexWrapperPerfil>
                            <FlexWrapperPerfil style={{ marginTop: 2, }}>
                                <BoldText>{"Email:"}</BoldText>
                                <AppText>{safeGetOr('', 'tx_correo')(profile)}</AppText>
                            </FlexWrapperPerfil>
                        </View>

                    </FlexBetweenWrapper_perfil>
                    <View style={{ marginBottom: 15 }}></View>
                </View>
            </View>
            <View style={styles.fondo}>
                <AppText style={styles.title}>{"Mi Datos"}</AppText>
                <AppInput
                    label={'Nombre (s)'}
                    onChangeText={(tx_nombre) => { setProfile({ ...profile, tx_nombre }) }}
                    value={safeGetOr('', 'tx_nombre')(profile)}
                    containerStyle={{ marginTop: 15 }}
                />
                <AppInput
                    label={'Apellido'}
                    onChangeText={(tx_apellido) => { setProfile({ ...profile, tx_apellido }) }}
                    value={safeGetOr('', 'tx_apellido')(profile)}
                />
                <AppInput
                    label={'Dirección'}
                    onChangeText={(tx_direccion) => { setProfile({ ...profile, tx_direccion }) }}
                    value={safeGetOr('', 'tx_direccion')(profile)}
                />
                <AppInput
                    label={'Provincia'}
                    onChangeText={(tx_provincia) => { setProfile({ ...profile, tx_provincia }) }}
                    value={safeGetOr('', 'tx_provincia')(profile)}
                />
                <AppInput
                    label={'Localidad'}
                    onChangeText={(tx_localidad) => { setProfile({ ...profile, tx_localidad }) }}
                    value={safeGetOr('', 'tx_localidad')(profile)}
                />
                <AppInput
                    label={'Cod. Postal'}
                    onChangeText={(tx_cod) => { setProfile({ ...profile, tx_cod }) }}
                    value={safeGetOr('', 'tx_cod')(profile)}
                />
                <AppInput
                    label={'Teléfono'}
                    onChangeText={(tx_telefono) => { setProfile({ ...profile, tx_telefono }) }}
                    value={safeGetOr('', 'tx_telefono')(profile)}
                />
                <AppInput
                    label={'WhatsApp'}
                    onChangeText={(tx_whatsapp) => { setProfile({ ...profile, tx_whatsapp }) }}
                    value={safeGetOr('', 'tx_whatsapp')(profile)}
                />
                <Button
                    disabled={loading}
                    loading={loading}
                    text={'Guardar cambios'}
                    onPress={handleUpdateProfile}
                />
                <Space height={30} />


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



            </View>
        </ScrollView>




    );
}

export default ProfileScreen;