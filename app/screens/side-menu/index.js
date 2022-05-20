import React from 'react';
import { View, TouchableOpacity, Image, ScrollView, SafeAreaView, Platform } from 'react-native';
import { UserAvatar } from '../../components';
import styles from './styles';
import { FlexBetweenWrapper, Heading2, AppText, Divider, FlexWrapper, Space } from '../../components/styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import { Colors, Dimensions } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import packageJson from '../../../package.json'
import { logoutUser } from '../../store/user/action';
import Screens from '../../constants/screens';


function InfoButton({ label, source, screen }) {
    const { navigate } = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigate(screen)
            }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <Image source={source} style={{ width: 36, height: 36 }} />
            <AppText>{label}</AppText>
        </TouchableOpacity>
    )
}

function MenuButton({ label, source, screen }) {
    const { navigate, reset } = useNavigation();
    const dispatch = useDispatch();
    return (
        <TouchableOpacity
            onPress={() => {
                if (screen !== 'logout') {
                    navigate(screen)
                } else {
                    dispatch(logoutUser());
                }
            }}
            style={styles.menuButton}
        >
            <FlexWrapper>
                <Image
                    source={source}
                    style={{ width: 22, height: 22, resizeMode: 'contain', marginRight: 12 }}
                />
                <AppText fontSize={16}>{label}</AppText>
            </FlexWrapper>
            {
                screen !== 'logout' && <Image
                    source={require('@assets/ios-arrow-right.png')}
                    style={{ width: 12, height: 14, resizeMode: 'contain' }}
                />
            }
        </TouchableOpacity>
    )
}


function SideMenu() {
    const profile = useSelector(store => store.user.profile);
    console.log(profile.id_TipoUsuario)
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <SafeAreaView />
            <FlexBetweenWrapper paddingHorizontal={20} marginTop={20}>
                <View style={{ width: Dimensions.deviceWidth - 220 }}>
                    <Heading2>{"Hola"}</Heading2>
                    <AppText style={styles.username}>{safeGetOr("", "tx_nombre")(profile)}</AppText>
                </View>
                <UserAvatar />
            </FlexBetweenWrapper>
            <View style={styles.card}>
                <InfoButton label={'Perfil'} source={require('@assets/profile.png')} screen={Screens.Profile} />
                <InfoButton label={'Contacto'} source={require('@assets/phone.png')} screen={Screens.Contact} />
                <InfoButton label={'Ayuda'} source={require('@assets/info.png')} screen={"Funcionamiento"} />
            </View>
            {profile.id_TipoUsuario==2 ?
            <View>
                <Heading2 style={[styles.subLabel, { marginBottom: 10, marginTop: 5 }]}>{"Mi Cuenta"}</Heading2>
                
                <Divider />
                <MenuButton
                    label={"Reservar Actividades"}
                    source={require('@assets/alert.png')}
                    screen={Screens.Reservas}
                />
                <Divider />
                <MenuButton
                    label={"Facturas"}
                    source={require('@assets/shipping-invoice.png')}
                    screen={Screens.Facturas}
                />
                <Divider />
                <MenuButton
                    label={"Mi Billetera"}
                    source={require('@assets/wallet.png')}
                    screen={Screens.Billetera}
                />
                <Divider />
                <MenuButton
                    label={"¿Cómo llegar?"}
                    source={require('@assets/maps.png')}
                    screen={Screens.ComoLlegar}
                />
                <Divider />

                <Heading2 style={[styles.subLabel, { marginBottom: 10, marginTop: 20 }]}>{"Información "}</Heading2>
                <Divider />
                <MenuButton
                    label={"Funcionamiento del Centro"}
                    source={require('@assets/operation.png')}
                    screen={"Funcionamiento"}
                />
                <Divider />
                <MenuButton
                    label={"Membresías y Puntos"}
                    source={require('@assets/star.png')}
                    screen={"Puntos"}
                />
                <Divider />
            </View> 
            : 
            <View>
                <Heading2 style={[styles.subLabel, { marginBottom: 10, marginTop: 20 }]}>{"Panel Administrador "}</Heading2>
                <Divider />  
                <MenuButton
                    label={"Actividades"}
                    source={require('@assets/activity-bold.png')}
                    screen={Screens.DeleteActivity}
                />
                <Divider />  
                <MenuButton
                    label={"Promociones"}
                    source={require('@assets/offers-bold.png')}
                    screen={Screens.CreateActivity}
                />
                <Divider />          
            </View>}
            <Space height={20} />
            <Divider />
            <MenuButton
                label={"Cerrar sesión"}
                source={require('@assets/logout.png')}
                screen={"logout"}
            />
            <Divider />
            <AppText style={{ padding: 15, fontSize: 13, marginBottom: Platform.OS == 'android' ? 0 : 20 }}>{`Versión  ${packageJson.version}`}</AppText>
        </ScrollView>
    );
}

export default SideMenu;
