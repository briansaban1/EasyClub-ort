import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Image, StatusBar, Text, Alert } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import WService from '../service/WebService';
import ImageButton from './ImageButton';
import { AppText, FlexWrapper, Loader, Space } from './styled-components';
import { Header, Steps, AppInputModal, Button, SearchInput } from '.';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../utils/fp';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import LottieView from 'lottie-react-native';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import Screens from '../constants/screens';
import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';
import * as MercadoPagoService from '../screens/pago/mercadopago-service';


const wservice = new WService();


const ReservaModal = ({
    data,
    fecha,
    nombre,
    idActividad,
    horadata,
    imagen,
    arancel,
    precio,
    detalles,
    onClose,
}) => {

    const { navigate } = useNavigation();


    const profile = useSelector(store => store.user.profile)

    const id = safeGetOr('', 'id_usuario')(profile)
    console.log(id)
    const [actividades, setActividades] = useState(idActividad);
    const [hora, setHora] = useState(data);
    const [fechas, setFechas] = useState(fecha);
    const fechaArregada = moment(fechas).format('DD/MM/YYYY')

    const [arancelado, setArancelado] = useState(arancel);

    const [nombreDeporte, setNombreDeporte] = useState(nombre);

    const [img, setImg] = useState(imagen);

    const [precioCobro, setPrecioCobro] = useState(precio);

    const [detalle, setDetalle] = useState(detalles);

    const [horadataAMPM, setHoraDataAMPM] = useState(horadata);

    console.log(id, hora, actividades, moment(fechas).format('DD/MM/YYYY'), 'aca')

    const [loading, setLoadng] = useState(false)


    //se carga la reserva a la base de datos segun los datos recibidos por parametro.
    //la api se encargara de verificar que no haya una reserva identica y retornara status
    //diferente a 1 en caso que haya una reserva igual

    function generarReserva(id, idActividad, hora, fechaphp) {

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
                console.log(response.status)
                onClose();
                setLoadng(false)
                //se redirecciona a la pantalla de exito
                navigate(Screens.ExitoReserva)
                //se borran todas las propiedades
                setActividades('')
                setHora('')
                setFechas('')
                setHoraDataAMPM('')
                setImg('')
                setPrecioCobro('')
            }else{
                Alert.alert(
                    '¡Atención!',
                    'Ya has realizado una reserva en este horario, por favor selecioná otro.',
                    [
                        { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
                    ]
                );
                setLoadng(false)
            }
        })
    };

//se envia a la api el id de usuario, id de actividad y la fecha y hora seleccionada y se verifica
//que el mismo usuario no tenga otra reserva identica. Si el status es igual a 1 se procede a
//llamar al metodo para procesar el pago

    function verificar(id, actividades, hora, fechaArregada, nombreDeporte, precioCobro){
        console.log(id, actividades, hora, fechaArregada, nombreDeporte, precioCobro,'Datos en pago')

        wservice.verificarReserva({
            id,
            actividades,
            hora,
            //se pasa la fecha en otro formato para que lo tome la api
            fechaphp: moment(fechas).format('YYYY-MM-DD'),
        }).then(response => {
            console.log(response.msg)
        if (response.status == 1) {
                console.log(id, actividades, hora, fechaArregada, nombreDeporte, precioCobro, detalle)
                //se inicia el proceso de pago
                startCheckout(id, actividades, hora, fechaArregada, nombreDeporte, precioCobro, detalle)

        }else{
            Alert.alert(
                '¡Atención!',
                'Ya has realizado una reserva en este horario, por favor selecioná otro.',
                [
                    { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
                ]
            );
            setLoadng(false)
        }
    })


    };



    const [paymentResult, setPaymentResult] = useState(null);
console.log(parseInt(precioCobro), 'precio')

//se reciben los datos necesarios por parametro para iniciar el proceso de pago con la libreria de
//mercadopago. En caso del status sea 'approved' se ejecutaran los metodos para generar la factura y reservar la actividad

    const startCheckout = async (id, actividades, hora, fechaArregada, nombreDeporte, precioCobro) => {
        console.log(id, actividades, hora, fechaArregada, nombreDeporte, precioCobro,'Datos en pago')
       
        try {
            onClose()  
            const preferenceId = await MercadoPagoService.getPreferenceId('payer@email.com', {
              title: nombreDeporte,
              description: nombreDeporte,
              quantity: 1,
              currency_id: 'ARS',
              unit_price: precioCobro,
            });
            
            const payment = await MercadoPagoCheckout.createPayment({
              publicKey: 'TEST-edd07fe8-f948-4274-8900-c08bc5fc01a5',
              preferenceId,
            });
    
            console.log(payment)
    
            if (payment.status === 'approved'){
                console.log(payment);
                setPaymentResult(payment);
                //se genera la factura
                generarFactura(id, actividades, precioCobro, nombreDeporte, payment.id);
                //se genera la reserva
                generarReserva(id, actividades, hora, fechaArregada);
                
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



//se carga la factura a la base de datos segun los datos recibidos por parametro 
    function generarFactura(id, idActividad, precio, nombreDeporte, idPago) {
     console.log(id, idActividad, precio, nombreDeporte, idPago, 'factura')
        wservice.cargarFactura({
            id,
            idActividad,
            precio,
            nombreDeporte,
            idPago
        }).then(response => {
            
            if (response.status == 1) {
                console.log(response.status, response.msg, 'STATUS FACTURA')
                setLoadng(false)
                setPrecioCobro('')
                setDetalle('')
            }
            console.log(response.msg, response.status, 'mensaje factura')
        })
    };





    return (

        <Modal
            transparent={true}
            visible={true}
            animationType={'fade'}
            onRequestClose={() => {
                onClose();
            }}>
            <View style={styles.body}>
                <View style={styles.container}>
                    <ImageButton
                        source={Images.Close}
                        imageStyle={styles.close}
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => {
                            onClose();
                        }} />
                    <View style={styles.mainContainer}>
                        <AppText style={styles.title}>{"Confirmar Reserva"}</AppText>

                        <View style={{ height: 25 }} />

                        <View style={{flexDirection:'row', alignItems:'center', }}>
                        <Image
                                source={{
                                    uri: img,
                                }}
                                imageStyle={{ resizeMode: 'stretch' }}
                                style={styles.location}
                            />
                        <View style={{marginLeft:15}}>
                            <AppText style={styles.textDeporte}>{nombreDeporte}</AppText>
                            {arancelado != 0 && <AppText style={styles.textDeporte}>Valor: ${precioCobro}</AppText>}
                            <AppText style={styles.text2}>Fecha: {fechaArregada} </AppText>
                            <AppText style={styles.text2}>Hora: {hora} {horadataAMPM} </AppText>
                        </View>
                        </View>
                        <Space />

                        <View>

                        </View>
                        <Space />



                        <Space />

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            {arancelado == 0 ? <Button
                                text={"Aceptar"}
                                //onPress={}
                                loading={false}
                                buttonStyle={{ width: '47%', backgroundColor: '#36E26F' }}
                                onPress={() => {
                                    setLoadng(true)
                                    generarReserva(id, actividades, hora, fechaArregada);
                                }}
                            /> : 
                            <Button
                                text={"Abonar"}
                                //onPress={}
                                loading={false}
                                buttonStyle={{ width: '47%', backgroundColor: '#36E26F' }}
                                onPress={() => {
                                    setLoadng(true)
                                    verificar(id, actividades, hora, fechaArregada, nombreDeporte, parseInt(precioCobro), detalle)
                                    //navigate(Screens.RealizarPago, {id: actividades, nombre: nombreDeporte, valor: arancelado, fec: fechaArregada, hr: hora})
                                }}
                            />}
                            <Button
                                text={"Cancelar"}
                                buttonStyle={{ width: '47%' }}
                                onPress={() => {
                                    onClose();
                                }}
                            />
                        </View>
                        <Space />
                    </View>
                </View>
            </View>

        </Modal>
        
    );
};

export default ReservaModal;



const styles = StyleSheet.create({
    body: {
        width: Dimensions.deviceWidth,
        height: Dimensions.deviceHeight,
        backgroundColor: '#000000cc',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: Colors.white,
        width: Dimensions.deviceWidth,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    mainContainer: {
        width: '100%',
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: Dimensions.px25,
        color: Colors.darkblue
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: Dimensions.px18,
        color: Colors.darkblue
    },
    label: {
        width: '100%',
        fontSize: Dimensions.px15
    },
    right: {
        width: '70%',
    },
    close: {
        width: 15,
        height: 15,
        margin: 15,
    },
    list: {
        flex: 1,
        marginTop: 20,
    },
    mitad: {
        width: '50%',
        fontSize: Dimensions.px15
    },
    modal: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000040',

    },
    modalContainer: {
        width: '70%',
        minHeight: 270,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.blue400,
        marginBottom: 10,

        marginTop: 20,
    },
    hr: {
        width: '85%',
        height: 0.6,
        backgroundColor: '#e3e3e3'
    },
    flexContainer1: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 0,
        marginBottom: 13,
        width: '85%'
    },
    button1: {
        height: 45,
        borderRadius: 10,
        width: Dimensions.deviceWidth - 200,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue,
        marginTop: 10,
        marginBottom: 20
    },
    text1: {
        color: Colors.white,
        fontSize: Dimensions.px16,
        fontWeight: 'bold'
    },
    text2: {
        color: Colors.blue400,
        fontSize: Dimensions.px15,
        paddingVertical: 2,
        //marginBottom: 5,
        //paddingHorizontal: 30,

    },
    textDeporte: {
        color: Colors.blue400,
        fontSize: Dimensions.px16,
        paddingVertical: 2,
        fontWeight: 'bold'
        //marginBottom: 5,
        //paddingHorizontal: 30,

    },
    location: {
        width: 40,
        height: 40,
        marginHorizontal: 10
    },
});