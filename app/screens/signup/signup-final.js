import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, ImageButton, Header } from '../../components';
import { AppText } from '../../components/styled-components';
import Images from '../../constants/images';
import styles from './styles';
import { Colors, Dimensions } from '../../constants';
import { openTermsOfService } from '../../utils';
import { registerUser } from '../../store/user/action';

const notes = `Gracias por tu interés en EasyClub. Los servicios provistos por la empresa operan bajo las normas y leyes de Argentina.`

function SignupFinalScreen() {
    const dispatch = useDispatch();
    const { navigate, canGoBack, goBack } = useNavigation()
    const profile = useSelector(store => store.user.registerProfile);
    const [loading, setLoading] = useState(false)
    async function register() {
        setLoading(true);
        try {
            await dispatch(registerUser(profile))
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header />

            <AppText style={styles.title}>{'Antes de Empezar'}</AppText>
            <AppText style={styles.notes}>{notes}</AppText>

            <AppText style={styles.notes_texto}>
                {"Utilizando nuestro servicio, estás\naceptando todos los "}
                {<AppText
                    color={Colors.blue}
                    style={{ fontSize: Dimensions.px14 }}
                    onPress={() => { openTermsOfService() }}
                >{"Términos &\n Condiciones."}</AppText>}
            </AppText>
            <Button
                loading={loading}
                text={"Aceptar"}
                onPress={() => { register() }}
            />
            <AppText style={styles.terms}>{"Tenés que aceptar nuestros Términos & Condiciones para continuar"}</AppText>
        </View>
    );
}

export default SignupFinalScreen;
