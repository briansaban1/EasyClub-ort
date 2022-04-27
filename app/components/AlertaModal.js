import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Image, StatusBar, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import WService from '../service/WebService';
import ImageButton from './ImageButton';
import { AppText, FlexWrapper, Loader, Space } from './styled-components';
import { Header, Steps, AppInputModal, DropDownAlerta, Button, DropDownAlertasLarge, SearchInput } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../utils/fp';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import LottieView from 'lottie-react-native';
import colors from '../constants/colors';



const wservice = new WService();
const detalle1 = String();


const TrackModal = ({
    data,
    fecha,
    actividad,
    horadata,
    onClose,
}) => {
    const [hisotry, setHistory] = useState([]);
    
    const profile = useSelector(store => store.user.profile)
    const nom = safeGetOr('', 'tx_nombre')(profile)
    const ape = safeGetOr('', 'tx_apellido')(profile)
    const mail = safeGetOr('', 'tx_correo')(profile)
    const [actividades, setActividades] = useState(actividad);
    const [hora, setHora] = useState(data);
    const [fechas, setFechas] = useState(fecha);
    const [horadataAMPM, setHoraDataAMPM] = useState(horadata);

console.log(hora, actividades, moment(fechas).format('DD/MM/YYYY'), 'aca')

    const [fileName, setFileName] = useState(null)
    const [loading, setLoadng] = useState(false)



    const [searchValue, setSearchValue] = useState()



 

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
                        }}/>
                    <View style={styles.mainContainer}>
                        <AppText style={styles.title}>{"Confirmar Reserva"}</AppText>
                   
                        <Space />

                        <AppText style={styles.textDeporte}>{actividad}</AppText>
                        <AppText style={styles.text2}>Fecha: {moment(fechas).format('DD/MM/YYYY')} </AppText>
                        <AppText style={styles.text2}>Hora: {hora} {horadataAMPM} </AppText>
                        
                        <Space />

                        <View>
                        
                        </View>
                        <Space />

                    

                        <Space />

                      
                        <Button
                        text={"Continuar"}
                        //onPress={}
                        disabled={!fileName}
                    />
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
                            <AppText style={styles.title1}>¡Modificación exitosa!</AppText>
                            <View style={styles.hr} />

                            <Text style={{color: Colors.blue400, fontSize: Dimensions.px15, marginTop:12, width: '85%', alignItems: 'center', textAlign: 'center', justifyContent: 'center',}}>En breve vamos a estar validando la información.</Text>
                            <View style={styles.flexContainer1}>
                            <LottieView source={require('@assets/check.json')}
                    autoPlay={true}
                    loop={false}
                    resizeMode="cover" 
                    style={{ width: 110, height: 110, marginVertical: 5, alignSelf: 'center' }}
                    />


                            </View>
                            

                            <TouchableOpacity style={styles.button1}
                                onPress={() => onClose() }
                            >
                                <AppText style={styles.text1}>Aceptar</AppText>
                            </TouchableOpacity>

                           


                        </View>
                    </View>
                </Modal>



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
});