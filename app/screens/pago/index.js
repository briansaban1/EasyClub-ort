import React, { useState, useEffect, useRef } from 'react';
import { Image, ScrollView, View, Text, TouchableOpacity, FlatList, Animated, Easing, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Header, SearchInput, ReservaModal, Button } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { AppText, FlexWrapper, Loader, Space } from '../../components/styled-components';
import { Colors, Dimensions } from '../../constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment, { min } from 'moment';
import 'moment/locale/es'
import WService from '../../service/WebService';
import MercadoPagoWebTokenizeCheckout from '@blackbox-vision/react-native-mercadopago-tokenize-checkout';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';


function PagoReserva(data) {

    const dispatch = useDispatch();


    console.log( data.route.params.id  , 'id ') 
    console.log( data.route.params.nombre , 'deporte ')
    console.log( data.route.params.valor , 'precio')
    console.log( data.route.params.fec , 'fecha')
    console.log( data.route.params.hr , 'hora')

    const [idAct, setIdAct] = useState(data.route.params.id)
    const [nombreAct, setNombreAct] = useState(data.route.params.nombre)
    const [precio, setPrecio] = useState(data.route.params.valor)
    const [fechas, setFechas] = useState(data.route.params.fec)
    const [hor, setHor] = useState(data.route.params.hr)


    const { navigate } = useNavigation();



    const profile = useSelector(store => store.user.profile)

    const _actividades = useSelector(store => store.user.actividades)
    const [actividades, setActividades] = useState(_actividades)

    

    const wservice = new WService();




    return (
        <>
      <View style={styles.container}>

            <Header
                    title={"Pago de actividad"}
                    description={'Procesamiento de pago'}
                />

                <View style={{ height: 20 }} />

                

                <View>

                </View>
                </View>
        </>
    );
}

export default PagoReserva;