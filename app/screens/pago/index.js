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
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
import * as MercadoPagoService from './mercadopago-service';
import { safeGetOr } from '../../utils/fp';


function PagoReserva(data) {

    const dispatch = useDispatch();


    console.log( data.route.params.id  , 'id ') 
    console.log( data.route.params.nombre , 'deporte ')
    console.log( data.route.params.valor , 'precio')
    console.log( data.route.params.fec , 'fecha')
    console.log( data.route.params.hr , 'hora')

    const [idActividad, setIdActividad] = useState(data.route.params.id)
    const [nombreAct, setNombreAct] = useState(data.route.params.nombre)
    const [precio, setPrecio] = useState(data.route.params.valor)
    const [fechas, setFechas] = useState(data.route.params.fec)
    const [hora, setHora] = useState(data.route.params.hr)
    const fechaArregada = moment(fechas).format('DD/MM/YYYY')


    const { navigate } = useNavigation();

console.log( nombreAct)

const profile = useSelector(store => store.user.profile)

const id = safeGetOr('', 'id_usuario')(profile)


    const wservice = new WService();

    useEffect(() => {
        startCheckout(id, idActividad, hora, fechaArregada)

    }),[];

    const [paymentResult, setPaymentResult] = useState(null);

const startCheckout = async ({id, idActividad, hora, fechaArregada}) => {
      try {
        const preferenceId = await MercadoPagoService.getPreferenceId('payer@email.com', {
          title: nombreAct,
          description: nombreAct,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 100,
        });
  
        const payment = await MercadoPagoCheckout.createPayment({
          publicKey: 'TEST-edd07fe8-f948-4274-8900-c08bc5fc01a5',
          preferenceId,
        });

        console.log(payment)

        if (payment.status === 'approved'){
            console.log(payment)
            setPaymentResult(payment)
            generarReserva(id, idActividad, hora, fechaArregada);
            onclose();
            navigate(Screens.ExitoReserva)
        };
        if(payment.status === 'rejected'){

            Alert.alert(
                'Pago Rechazado',
                'Por favor reintentá el pago. Si el error persiste, por favor contactanos'
              );
              navigate(Screens.Reservas)

        };
         

      } catch (err) {
        Alert.alert('Algo salió mal', err.message);
      }
    };


        //se carga la reserva a la base de datos
        function generarReserva(id, idActividad, hora) {

            wservice.cargarReserva({
                id,
                idActividad,
                hora,
                //se pasa la fecha en otro formato para que lo tome la api
                fechaphp: moment(fechas).format('YYYY-MM-DD'),
            }).then(response => {
                if (response.status == 1) {
                    //si la carga es exitosa se redirecciona a la ventana de exito
                    //goExito()
                    console.log(response.status, 'ESTADO PAGO')
                   
                    //se redirecciona a la pantalla de exito
                    navigate(Screens.ExitoReserva)
                    //se borran todas las propiedades
                    setIdActividad('')
                    setHora('')
                    setFechas('')

                }
            })
        }



    return (
        <>
      <View style={styles.container}>

            <Header
                    title={"Pago de actividad"}
                    description={'Procesamiento de pago'}
                />

                <View style={{ height: 20 }} />

      <Text style={styles.text}>{paymentResult}</Text>

                <View>

                </View>
                </View>
        </>
    );
}

export default PagoReserva;