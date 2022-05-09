import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppInput, Header, ImageButton, Button, DropDownGrande } from '../../components';
import { updateRegisterProfile } from '../../store/user/action';
import styles from './styles';
import Images from '../../constants/images';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';
import DropDownInput from '../../components/DropDown';
import DropDownInputRegistro from '../../components/DropDownRegistro';


function SignUpDeliveryScreen() {
    const dispatch = useDispatch();
    const { navigate } = useNavigation()
    const profile = useSelector(store => store.user.registerProfile);
    const [loading, setLoading] = useState(false);

    function updateProfile(prop) {
        dispatch(updateRegisterProfile({ ...profile, ...prop }))
    }

    const { provincia, direccion, cod, localidad, } = profile;
    const allow = provincia && direccion && cod && localidad
    return (
        <ScrollView style={styles.container}>

            <View>
                <SafeAreaView />
                <Header title={"Tus Datos"} description={'Creá tu cuenta ahora.'} />
                <AppInput
                    label={'Dirección de Facturación'}
                    onChangeText={(text) => updateProfile({ direccion: text })}
                    value={direccion}
                    containerStyle={{ marginTop: 40 }}
                />
               
                <DropDownInputRegistro
                                        label={"Provincia"}
                                        options={['BUENOS AIRES', 'CAPITAL FEDERAL', 'CATAMARCA', 'CHACO', 'CHUBUT', 
                                    'CÓRDOBA', 'CORRIENTES', 'ENTRE RÍOS', 'FORMOSA', 'JUJUY', 'LA PAMPA', 'LA RIOJA', 'MENDOZA', 'MISIONES',
                                'NEUQUÉN', 'RÍO NEGRO', 'SALTA', 'SAN JUAN', 'SAN LUIS', 'SANTA CRUZ', 'SANTA FE', 'SANTIAGO DEL ESTERO',
                                'TIERRA DEL FUEGO', 'TUCUMÁN']}
                                        value={provincia}
                                        onSelect={(id, text) => updateProfile({ provincia: text })}
                                    />
                <AppInput
                    label={'Localidad'}
                    onChangeText={(text) => updateProfile({ localidad: text })}
                    value={localidad}
                />
                <AppInput
                    label={'Código Postal'}
                    onChangeText={(text) => updateProfile({ cod: text.trim().replace(/[^0-9]/g, '') })}
                    value={cod}
                />

                <Button
                    disabled={!allow}
                    loading={loading}
                    text={'Continuar'}
                    onPress={() => { navigate(Screens.SignupFinal) }}
                />
                <View style={{ height: 35 }}></View>
            </View>
        </ScrollView>

    );
}

export default SignUpDeliveryScreen;
