import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { Header, ShadowDivider } from '../../components';
import { AppText, Divider, FlexWrapper, Space } from '../../components/styled-components';
import { logoutUser } from '../../store/user/action';
import styles from './styles';
import Screens from '../../constants/screens';

function OptionButton({ label, source, screen }) {
    const { navigate } = useNavigation();
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
                    style={{ width: 25, height: 25, resizeMode: 'contain', marginRight: 10 }}
                />
                <AppText fontSize={16}>{label}</AppText>
            </FlexWrapper>
            <Image
                source={require('@assets/ios-arrow-right.png')}
                style={{ width: 12, height: 20, resizeMode: 'contain' }}
            />
        </TouchableOpacity>
    )
}

function OptionsScreen() {

    return (
        <View style={styles.container}>
            <Header
                title={"Opciones"}
                description={'Ver y editar tus preferencias'}
            />
            <Space height={30} />

            <OptionButton
                label={"Notificaciones"}
                source={require('@assets/options/notifications.png')}
                screen={Screens.Notifications}
            />
            <Divider marginHorizontal={30} />
            <OptionButton
                label={"Modificar contraseña"}
                source={require('@assets/options/change-password.png')}
                screen={Screens.ChangePassword}
            />
            <Divider marginHorizontal={30} />
            <OptionButton
                label={"Modificar email"}
                source={require('@assets/options/change-email.png')}
                screen={Screens.ChangeEmail}
            /><Divider marginHorizontal={30} />
            <OptionButton
                label={"Eliminar cuenta"}
                source={require('@assets/options/delete.png')}
                screen={Screens.DeleteAccount}
            />
            <ShadowDivider/>
            <OptionButton
                label={"Historial de sesiones"}
                source={require('@assets/options/sessions.png')}
                screen={Screens.Sessions}
            />
            <Divider marginHorizontal={30} />
            <OptionButton
                label={"Acerca De"}
                source={require('@assets/options/info.png')}
                screen={Screens.Help}
            />
            <ShadowDivider/>
            <OptionButton
                label={"Cerrar Sesión"}
                source={require('@assets/options/logout.png')}
                screen={"logout"}
            />
        </View>
    );
}

export default OptionsScreen;
