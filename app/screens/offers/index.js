import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getPromociones } from '../../store/user/action';
import { Header, SubmissionPromociones, ErrorPromociones } from '../../components';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';



function PromocionesScreen() {
const dispatch = useDispatch();
useEffect(() => {
dispatch(getPromociones())
}, [])
const profile = useSelector(store => store.user.profile)

const _promociones = useSelector(store => store.user.promociones)
const [promociones, setPromociones] = useState(_promociones)

const [visibleModal, setVisibleModal] = useState(false);
const [modalData, setModalData] = useState({});
const { navigate } = useNavigation();


console.log(promociones, 'IJOASFBNIAUSFJN FLAGH GLAH PROMOCIONES ---------------------------------------------------', "color: #bada55")

    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Promociones"}
                    description={'Listado de ofertas'}
                />
                
                <View style={{height:20}} />

                {_promociones.length == 0 &&
                
                    <ErrorPromociones/>
                    
                }
                {promociones.map(i => <SubmissionPromociones data={i} profile={profile} onPress={(data) => {
                   navigate(Screens.GenerarReservaPromocion, {data})
                   
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
        </>
    );
}

export default PromocionesScreen;