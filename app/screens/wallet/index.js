import React, { useState, useEffect } from 'react';
import { Linking, View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, Alert, SafeAreaView, Touchable } from 'react-native';
import { Header, ImageButton, Button, SubmissionWallet, TrackModal, Error, ErrorPuntos, ModalWallet } from '../../components';
import { Divider, FlexWrapper, AppText, Space } from '../../components/styled-components';
import styles from './styles';
import { Title } from '../../components/Header';
import Screens from '../../constants/screens';
import { useSelector, useDispatch } from 'react-redux';
import PercentageCircle from 'react-native-percentage-circle';
import { safeGetOr } from '../../utils/fp';
import { Colors, Dimensions, Images, AppStyles } from '../../constants';
import { useNavigation } from '@react-navigation/native';

import { getWallet } from '../../store/user/action';
import { getCanjear } from '../../store/user/action';
import { getDescuento } from '../../store/user/action';


function WalletScreen() {
    const _profile = useSelector(store => store.user.profile);
    const [profile, setProfile] = useState(_profile);

    const _wallet = useSelector(store => store.user.wallet)
    const [wallet, setWallet] = useState(_wallet)

    const [loading, setLoading] = useState(false);
    const resumen = useSelector(store => store.user.wallet)
    const { navigate } = useNavigation();

    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});


    
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getWallet(profile.tx_correo, profile.user));
        console.log(_wallet)
      }, [])

    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            <View >
                <Header
                    title={"My Wallet"}
                    description={"Visualizá el detalle de tu Billetera"}
                />

                <View height={15} />


                <View style={styles.fondo_new}>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', }}>
                        <AppText style={styles.title_corto}>{"Balance de Mi Billetera"}</AppText>
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
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, marginBottom: 15, alignItems: 'center', }}>
                        <View>
                            <PercentageCircle style={{ alignItems: 'center', justifyContent: 'center', }} alignItems={'center'} radius={38} bgcolor="#fafafa" borderWidth={4} percent={100} color={Colors.darkblue}>

                                <View>

                                    <Image

                                        source={require('@assets/wallet.png')}
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
                                <Text style={{ fontSize: 30, justifyContent: 'center', color: "#ADE6FE", fontWeight: 'bold', marginBottom: 5 }}>$ {0}</Text>
                            </View>
                            <View style={{width:'90%'}}>
                                <Text style={{ fontSize: 10, justifyContent: 'center', color: Colors.blue400, fontWeight: 'bold' }}>Balance total de tu cuenta a la fecha</Text>
                            </View>
                        </View>

                    </View>

                    <View style={{ paddingHorizontal: 20, justifyContent: 'space-between',  alignItems: 'center' }}>


                        {/* <TouchableOpacity style={styles.button1}
                            onPress={() => navigate(Screens.Canjear)
                            }>

                            <Text style={styles.buttonText1}>Canjear Puntos</Text>

                        </TouchableOpacity> */}

                    </View>

                    <View style={styles.hr} />

                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', minHeight: 35, alignItems: 'center' }}>


                        <Text style={{ fontSize: 15, justifyContent: 'center', color: Colors.blue400, fontWeight: 'bold' }}>EASYWallet</Text>
                        <Text style={{ fontSize: 15, justifyContent: 'center', color: Colors.blue400, fontWeight: 'bold' }}>ID: #{profile.id_usuario}</Text>


                    </View>

                </View>



               


                <View style={styles.fondo}>

                    <View style={{ alignItems: 'center' }}>
                        <AppText style={styles.title}>{"Actividad Reciente"}</AppText>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>



                        <View style={styles.data_container}>

                            {_wallet.length == 0 &&
                                <View style={{ marginBottom: 20 }}>
                                    <ErrorPuntos />
                                </View>
                            }
                            {_wallet.map(i => <SubmissionWallet data={i} profile={profile} onPress={(data) => {
                    setModalData(data);
                    setVisibleModal(true);
                }} />)}



                        </View>
                    </View>

                </View>

            </View>

            {visibleModal && <ModalWallet onClose={() => { setVisibleModal(false) }} data={modalData} />}


        </ScrollView>
    );
}

export default WalletScreen;
