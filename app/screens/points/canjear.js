import React, { useState, useEffect } from 'react';
import { Linking, View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, Alert, SafeAreaView, Touchable } from 'react-native';
import { Header, ImageButton, Button, SubmissionPuntos, TrackModal, Error } from '../../components';
import { Divider, FlexWrapper, AppText, Space } from '../../components/styled-components';
import styles from './styles';
import { Title } from '../../components/Header';
import Screens from '../../constants/screens';
import { useSelector, useDispatch } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import { Colors, Dimensions, Images, AppStyles } from '../../constants';
import { useNavigation } from '@react-navigation/native';



function ContactScreen() {
    const _profile = useSelector(store => store.user.profile);
    const [profile, setProfile] = useState(_profile);
    const _puntos = useSelector(store => store.user.puntos)
    const [puntos, setPuntos] = useState(_puntos)

    const [loading, setLoading] = useState(false);
    const resumen = useSelector(store => store.user.resumen)
    const { navigate } = useNavigation();

    const _descuento = useSelector(store => store.user.descuento)
    const [descuento, setDescuento] = useState(_descuento)

    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const dispatch = useDispatch();


    console.log(descuento);


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            <View >
                <Header
                    title={"Beneficios"}
                    description={"Lo que tenemos para vos"}
                />

                <View height={15} />

                <View style={styles.fondo}>

                    

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>

                        <View style={styles.data_container}>

                            <Text style={styles.profile_text}>
                            ¡Muy pronto vas a poder disfrutar de nuevos beneficios!
                            </Text>


                        </View>

                    </View>

                </View>

            </View>

        </ScrollView>
    );
}

export default ContactScreen;
