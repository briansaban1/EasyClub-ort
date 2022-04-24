import React, { useState, useEffect } from 'react';
import { Linking, View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, Alert, SafeAreaView, Touchable } from 'react-native';
import { Header, ImageButton, Button, SubmissionPuntos, TrackModal, Error, ErrorPuntos } from '../../components';
import { Divider, FlexWrapper, AppText, Space } from '../../components/styled-components';
import styles from './styles';
import { Title } from '../../components/Header';
import Screens from '../../constants/screens';
import { useSelector, useDispatch } from 'react-redux';
import PercentageCircle from 'react-native-percentage-circle';
import { safeGetOr } from '../../utils/fp';
import { Colors, Dimensions, Images, AppStyles } from '../../constants';
import { useNavigation } from '@react-navigation/native';

import { getPuntos } from '../../store/user/action';



function ContactScreen() {
    const _profile = useSelector(store => store.user.profile);
    const [profile, setProfile] = useState(_profile);
    const _puntos = useSelector(store => store.user.puntos)
    const [puntos, setPuntos] = useState(_puntos)

    const [loading, setLoading] = useState(false);
    const resumen = useSelector(store => store.user.resumen)
    const { navigate } = useNavigation();

    
    var suma = 0;
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getPuntos(profile.tx_correo));
        console.log(_puntos)
      }, [])

    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            <View >
                <Header
                    title={"Puntos"}
                    description={"Visualizá el detalle de tus Puntos"}
                />

                <View height={15} />


                <View style={styles.fondo_new}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <AppText style={styles.title_corto}>{"Balance de Puntos"}</AppText>
                        <TouchableOpacity
                            onPress={() => {
                                navigate(Screens.Obtenerlos)
                            }}>
                            <Image

                                source={require('@assets/options/info.png')}
                                style={[
                                    {
                                        resizeMode: 'contain',
                                        width: 30,
                                        height: 30,
                                        marginTop: 8
                                    },
                                ]}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, alignItems: 'center', }}>
                        <View>
                            <PercentageCircle style={{ alignItems: 'center', justifyContent: 'center', }} alignItems={'center'} radius={38} bgcolor="#fafafa" borderWidth={4} percent={safeGetOr("", "puntos")(resumen) / safeGetOr("", "puntos")(resumen) + 99} color={Colors.darkblue}>

                                <View>

                                    <Image

                                        source={require('@assets/points.png')}
                                        style={[
                                            {
                                                resizeMode: 'contain',
                                                width: 28,
                                                height: 26,
                                                tintColor: Colors.darkblue,
                                            },
                                        ]}
                                    />
                                </View>

                            </PercentageCircle>
                        </View>

                        <View style={{ marginLeft: 15, marginTop: 0, }}>
                            <View>
                                <Text style={{ fontSize: 30, justifyContent: 'center', color: "#ADE6FE", fontWeight: 'bold', marginBottom: 5 }}>{safeGetOr("", "puntos")(resumen)}pts</Text>
                            </View>
                            <View style={{width:'90%'}}>
                                <Text style={{ fontSize: 10, justifyContent: 'center', color: Colors.blue400, fontWeight: 'bold' }}>1200 puntos hasta tu próxima recompensa</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ paddingHorizontal: 20, justifyContent: 'space-between',  alignItems: 'center' }}>


                    <TouchableOpacity style={styles.button1}
                            onPress={() => navigate(Screens.Canjear)
                            }>

                                <Text style={styles.buttonText1}>Canjear Puntos</Text>

                    </TouchableOpacity>

                    </View>

                    <View style={styles.hr} />

                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', minHeight: 35, alignItems: 'center' }}>


                        <Text style={{ fontSize: 15, justifyContent: 'center', color: Colors.blue400, fontWeight: 'bold' }}>EASYPoints</Text>
                        <Text style={{ fontSize: 15, justifyContent: 'center', color: Colors.blue400, fontWeight: 'bold' }}>ID: #{profile.id_usuario}</Text>


                    </View>

                </View>



               


                <View style={styles.fondo}>

                    <View style={{ alignItems: 'center' }}>
                        <AppText style={styles.title}>{"Actividad Reciente"}</AppText>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>



                        <View style={styles.data_container}>

                            {_puntos.length == 0 &&
                                <View style={{ marginBottom: 20 }}>
                                    <ErrorPuntos />
                                </View>
                            }
                            {_puntos.map(i => <SubmissionPuntos data={i} profile={profile} onPress={(data) => { }} />)}



                        </View>
                    </View>

                </View>

            </View>

        </ScrollView>
    );
}

export default ContactScreen;
