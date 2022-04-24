import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { Modal, StyleSheet, View, Image, StatusBar, Text, Alert, Clipboard } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import WService from '../service/WebService';
import ImageButton from './ImageButton';
import { AppText, FlexWrapper, Loader, Space } from './styled-components';
import { Header, Steps, AppInputModal, DropDownAlerta, Button, DropDownAlertasLarge } from '../components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import { safeGetOr } from '../utils/fp';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import LottieView from 'lottie-react-native';
import colors from '../constants/colors';
import { getCanjear, getDescuento } from '../store/user/action';
import { getPuntos, getUserMenu } from '../store/user/action';

import Toast, { DURATION } from 'react-native-easy-toast'




const wservice = new WService();

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
        fontSize: Dimensions.px18,
        color: Colors.darkblue
    },
    label: {
        width: '100%',
        fontSize: Dimensions.px15,
        color: Colors.blue400
    },
    label1: {
        width: '100%',
        fontSize: Dimensions.px15,
        color: Colors.blue400
    },
    right: {
        width: '70%',
        fontSize: Dimensions.px15,
        marginTop:20,
        color: Colors.darkblue,
        fontWeight: '500',
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
    }
});

const ModalWallet = ({
    data,
    onClose,
}) => {
    const [hisotry, setHistory] = useState([]);
    const dispatch = useDispatch();
    const toastRef = useRef();

    const profile = useSelector(store => store.user.profile)
    const nom = safeGetOr('', 'tx_nombre')(profile)
    const ape = safeGetOr('', 'tx_apellido')(profile)
    const mail = safeGetOr('', 'tx_correo')(profile)
    const [step, setStep] = useState(1);
    const [tracking, setTracking] = useState(data.color);
    const [courier, setCourier] = useState('');
    const [estado, setEstado] = useState('');
    const [met, setMet] = useState('');
    const [det, setDet] = useState('');
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState(null)
    const [loading, setLoadng] = useState(false)
    const resumen = useSelector(store => store.user.resumen)
    const puntototal = safeGetOr("", "wallet")(resumen);
    const puntosNecesarios = data.monto.slice(1, 5)
    const puntosDescontar = data.monto
    const _puntos = useSelector(store => store.user.puntos)
    const [puntos, setPuntos] = useState(_puntos)

    const display = ( (puntototal - puntosNecesarios) >= 0);
    console.log(display, puntototal, puntosNecesarios);

    const get_rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
    const get_uuid = (length=10) => {
     const ar = [
       "abcdefghijklmnopqrstuvxyz", //0: letras
       "0123456789"                 //1: números
     ]
     const r = new Array(length).fill(0).map(()=>{
       //indica de modo aleatorio si se usará letras o números
       let i = get_rnd(0,1)
       //si i=0 => letras, sino (i=1) numeros
       let str = ar[i]
       //si es 1 se pasará a mayusculas el string obtenido, evidentemente para los números
       //no hay mayor efecto
       str = get_rnd(0,1) ? str.toUpperCase() : str 
       //se obtendrá un valor entre 0 y la longitud del string anterior 10 o 25
       const max = str.length - 1 
       i = get_rnd(0, max)
       return str.split("")[i]
     }).join("")
     return r
   }



   const codigo = get_uuid();
   const [r, setR] = useState(codigo)
   console.log(r);


    function registerAlertarCompras() {

        wservice.cargarPuntos({
            r,
            mail,
            puntosDescontar,
            
        }).then(response => {
            if (response.status == 1) {
                onRefresh();
                 setLoadng();

            } else {
                Alert('Hubo un error en el proceso')
            }
        })
    }


    
      async function onRefresh() {

        try {
            await  
            dispatch(getDescuento(profile.tx_correo));
            dispatch(getPuntos(profile.tx_correo));
            dispatch(getCanjear(profile.tx_correo));
            dispatch(getUserMenu(profile.tx_correo));
       
        } catch (error) {

        }
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
                        }}
                    />
                    <View style={styles.mainContainer}>

                        <AppText style={styles.title}>Detalles de Transacción</AppText>
                        <Space />

                        <View >
                        <AppText style={styles.right}>Monto: U$S {data.monto}</AppText>
                        <Space />
                        
                        <AppText style={styles.label1}>Fecha: {moment(data.fecha).format("DD MMM YYYY")}</AppText>
                        <Space />
                        
                        <AppText style={styles.label1}>Concepto: {data.detalle}</AppText>
                        <Space />

                        
                      

                        </View>
                       
                        <Space />


                    </View>
                </View>
            </View>
            
                 <Modal
                    animationType="slide"
                    transparent={true}
                    style={styles.modal}
                    visible={loading}
                    >
                    <StatusBar backgroundColor="#00000040"  barStyle="light-content"/>

                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <AppText style={styles.title1}>¡Puntos Canjeados!</AppText>
                            <View style={styles.hr} />

                            <Text style={{color: Colors.blue400, fontSize: Dimensions.px15, marginTop:12, width: '85%', alignItems: 'center', textAlign: 'center', justifyContent: 'center',}}>
                                Tu código es: <Text style={{color: Colors.blue400, fontSize: Dimensions.px15, fontWeight:'bold'}}>
                               {r} <TouchableOpacity style={{}} onPress={() => {Clipboard.setString(r); toastRef.current.show('Copiado!', 800, () => {})}}>          
                            <Image
                            source={require('@assets/copy.png')}
                            imageStyle={{ resizeMode: 'stretch' }}
                            style={{width: 15, height: 15, marginLeft: 5, marginTop:0}}
                        />
                   </TouchableOpacity>
                            </Text>
                            </Text>
                            
                            

                            <View style={styles.flexContainer1}>
                            <LottieView source={require('@assets/check.json')}
                    autoPlay={true}
                    loop={false}
                    resizeMode="cover" 
                    style={{ width: 100, height: 100, marginVertical: 5, alignSelf: 'center' }}
                    />

                       <Text style={{color: Colors.blue400, fontSize: Dimensions.px14, marginTop:7, width: '85%', alignItems: 'center', textAlign: 'center', justifyContent: 'center',}}>
                              El cupón se guardará automáticamente en tu cuenta
                            </Text>

                            </View>
                            

                            <TouchableOpacity style={styles.button1}
                                onPress={() => onClose() }
                            >
                                <AppText style={styles.text1}>Aceptar</AppText>
                            </TouchableOpacity>

                           
                        </View>
                    </View>
                    <Toast ref={toastRef}
          style={{ backgroundColor: '#00000060', borderRadius: 15, alignItems: 'center', justifyContent: 'center', }}
          textStyle={{ color: 'white', fontSize: 16, textAlign: 'center' }}
        />
                </Modal>



        </Modal>
    );
};

export default ModalWallet;
