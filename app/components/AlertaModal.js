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



const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("fileToUpload", {
        name: photo.fileName,
        type: photo.type,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};

const wservice = new WService();
const detalle1 = String();

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
    }
});

const TrackModal = ({
    data,
    onClose,
}) => {
    const [hisotry, setHistory] = useState([]);
    
    const profile = useSelector(store => store.user.profile)
    const nom = safeGetOr('', 'tx_nombre')(profile)
    const ape = safeGetOr('', 'tx_apellido')(profile)
    const mail = safeGetOr('', 'tx_correo')(profile)
    const [step, setStep] = useState(1);
    const [actividad, setTracking] = useState(data.actividad);
    const [courier, setCourier] = useState('');
    const [estado, setEstado] = useState('');
    const [met, setMet] = useState('');
    const [det, setDet] = useState('');
    const [file, setFile] = useState('')
    const [fileName, setFileName] = useState(null)
    const [loading, setLoadng] = useState(false)

    const _actividades = useSelector(store => store.user.actividades)
    const [actividades, setActividad] = useState(_actividades)

    const [searchValue, setSearchValue] = useState()

    useEffect(() => {
        handleSearch();
    }, [searchValue])

    function handleSearch() {
        if (searchValue) {
            const filteredData = _actividades.filter(data => {
                const searchData = data && data.color.toUpperCase()
                const textData = searchValue.toUpperCase()
                return searchData.indexOf(textData) > -1
            })
            setActividad(filteredData)
        } else {
            setActividad(_actividades)
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
                        }}/>
                    <View style={styles.mainContainer}>
                        <AppText style={styles.title}>{"Reservar Actividad"}</AppText>
                        <Space />

                        <FlexWrapper>
                            <AppText style={styles.label}>Listado de Horarios</AppText>
                        </FlexWrapper>

                        <SearchInput 
             onChangeText={setSearchValue}
             value={searchValue}
            />
                        
                        <Space />
                        <AppText style={styles.subtitle}>{"Horarios Disponibles"}</AppText>
                        <Space />

                        <View>
                        <FlexWrapper style={{}}>
                            <View style={{
                                color: Colors.blue400,
                                //borderColor: '#A8B3C8',
                                //borderWidth: 1,
                                width: '95%',
                                //borderRadius: 5,
                                height: 95,
                                borderStyle: 'dotted',
                                backgroundColor: '#fff'
                            }}>

                        <View style={{flexDirection:'row', alignItems:'center'}}>

                            <View style={{
                                color: Colors.blue400,
                                borderColor: Colors.blue400,
                                borderWidth: 1,
                                width: '3%',
                                borderRadius: 25,
                                height: '60%',
                                borderStyle: 'dotted',
                                backgroundColor: Colors.blue400
                            }}></View>
                            <AppText style={styles.label}> Domingo, 10 de Abril de 2022</AppText>
                            </View>

                            <Space />
                            <View style={{
                                //color: Colors.blue400,
                                borderColor: '#A8B3C8',
                                borderWidth: 1,
                                width: '95%',
                                borderRadius: 5,
                                height: 60,
                                borderStyle: 'dotted',
                                //backgroundColor: '#f',
                                justifyContent:'center',
                                backgroundColor:'#fff',
                                //shadowOffset:'5',
                                shadowOpacity:'#0000030'
                            }}>

                   <View style={{flexDirection:'row', alignItems:'center', padding:10, alignContent:'space-between', width:'100%'}}> 
                        <View style={{alignContent:'space-between', width:'45%'}}>
                        <AppText style={styles.subtitle}>{data.nombre}</AppText></View>
                        <View style={{alignContent:'space-between'}}>
                        <AppText style={styles.label}> 10/04/2022 | 8.30AM</AppText>
                        </View>
                        </View>

                            </View>





                            
                            </View>
                        </FlexWrapper>
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
