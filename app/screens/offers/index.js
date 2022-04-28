import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SearchInput, AlertaModal, SubmissionPromociones } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';



function PromocionesScreen() {

const profile = useSelector(store => store.user.profile)

const _promociones = useSelector(store => store.user.promociones)
const [promociones, setPromociones] = useState(_promociones)

const [visibleModal, setVisibleModal] = useState(false);
const [modalData, setModalData] = useState({});
const { navigate } = useNavigation();


console.log(promociones)

    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Promociones"}
                    description={'Listado de ofertas'}
                />
                
                <View style={{height:20}} />

                {_promociones.length == 0 &&
                    <Image
                        source={Images.submissionEmpty}
                        style={AppStyles.submissionEmpty}
                    />
                }
                {promociones.map(i => <SubmissionPromociones data={i} profile={profile} onPress={(data) => {
                   navigate(Screens.Pago, {data})
                   
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
        </>
    );
}

export default PromocionesScreen;