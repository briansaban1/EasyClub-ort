import React, { useState } from 'react';
import { Linking, View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Header, ImageButton, Button, SubmissionPuntos, TrackModal, ErrorPuntos } from '../../components';
import { Divider, FlexWrapper, AppText, Space } from '../../components/styled-components';
import styles from './styles';
import { Title } from '../../components/Header';
import Screens from '../../constants/screens';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import { Colors, Dimensions, Images, AppStyles } from '../../constants';



function ObtenerPuntosScreen() {
    const _profile = useSelector(store => store.user.profile);
    const [profile, setProfile] = useState(_profile);
    const _puntos = useSelector(store => store.user.puntos)
    const [puntos, setPuntos] = useState(_puntos)

    const [loading, setLoading] = useState(false);
    const resumen = useSelector(store => store.user.resumen)


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            <View >
                <Header
                    title={"Puntos"}
                    description={"¿Cómo obtenerlos?"}
                />

                <View height={15} />

                <View style={styles.fondo}>

                    <View style={{ alignItems: 'center' }}>
                        <AppText style={styles.title}>{"Más Información"}</AppText>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'center', }}>

                        <View style={{width: '85%', marginBottom: 25 }}>
                           
                        <View style={{ marginBottom: 20 }}>
                                  
                                </View>

                            <Text style={styles.text15}>
                                ¡Muy pronto vas a poder disfrutar de nuevos beneficios!
                            </Text>


                            
                        </View>

                    </View>


                </View>


            </View>

        </ScrollView>
    );
}

export default ObtenerPuntosScreen;
