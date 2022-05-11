import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Image, StatusBar, Text } from 'react-native';
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


const wservice = new WService();


const TrackModal = ({
    data,
    fecha,
    nombre,
    idActividad,
    horadata,
    imagen,
    arancel,
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


    console.log(nombreDeporte)

    const [horadataAMPM, setHoraDataAMPM] = useState(horadata);

    console.log(id, hora, actividades, moment(fechas).format('DD/MM/YYYY'), 'aca')

    const [loading, setLoadng] = useState(false)

    //se carga la reserva a la base de datos
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
            }
        })
    }



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
                                    navigate(Screens.RealizarPago, {id: actividades, nombre: nombreDeporte, valor: arancelado, fec: fechaArregada, hr: hora})
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

export default TrackModal;



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