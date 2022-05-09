import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SubmissionReserva } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';



function ReservasScreen() {

const profile = useSelector(store => store.user.profile)

const _actividades = useSelector(store => store.user.actividades)
const [actividades, setActividades] = useState(_actividades)

const [visibleModal, setVisibleModal] = useState(false);
const [modalData, setModalData] = useState({});
const { navigate } = useNavigation();


console.log(actividades, _actividades)

    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Reservas"}
                    description={'Reserva de actividades'}
                />
                
                <View style={{height:20}} />

                {actividades.length == 0 &&
                    <Image
                        source={Images.submissionEmpty}
                        style={AppStyles.submissionEmpty}
                    />
                }
                {actividades.map(i => <SubmissionReserva data={i} profile={profile} onPress={(data) => {
                   navigate(Screens.GenerarReserva, {data})
                   
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
        </>
    );
}

export default ReservasScreen;