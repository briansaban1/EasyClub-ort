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
import { goBack, reset } from '../../navigation/RootNavigation';
import LottieView from 'lottie-react-native';


const notes = `En breve estarás recibiendo un mail con todos los detalles de tu cuenta.`

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

            <AppText style={styles.title}>{'¡Registro exitoso!'}</AppText>
            <AppText style={styles.notes1}>{notes}</AppText>

            <View style={styles.flexContainer1}>
                <LottieView source={require('@assets/check.json')}
                    autoPlay={true}
                    loop={false}
                    resizeMode="cover" 
                    style={{ width: 150, height: 160, marginVertical: 5, alignSelf: 'center' }}
                />

            </View>

            
            <Button
                loading={loading}
                text={"Aceptar"}
                onPress={() => { reset('Login') }}
            />
        </View>
    );
}

export default SignupFinalScreen;
