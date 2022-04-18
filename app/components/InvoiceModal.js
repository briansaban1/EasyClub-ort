import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, Image, Clipboard, Alert, Text } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import Toast, { DURATION } from 'react-native-easy-toast'
import { WebView } from 'react-native-webview';


import WService from '../service/WebService';
import ImageButton from './ImageButton';
import { AppText, FlexWrapper, Loader, Space } from './styled-components';

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
        fontSize: Dimensions.px18,
        color: Colors.darkblue
    },
    label: {
        width: '30%',
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
    modalContainer:{
        backgroundColor : 'white',
        width : '90%',
        height : '90%',
    }
});

const TrackModal = ({
    data,
    onClose,
}) => {
    const [hisotry, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        wservice.getCorreos(data.mail)
            .then(response => {
                if (response.status == 1) {

                    setHistory(response.data.map(item => ({
                        title: item.seguimiento,
                       
                        icon: (item.historial != 'Para entregar!' || item.historial != 'Entregado!') && require('@assets/tracking-success.png')
                            || require('@assets/tracking-empty.png')

                          
                    })));
                    
                    
                }
                setLoading(false)
            }).catch(e => {
                setLoading(false)
            })
    }, [])


 const seguimiento = data.seguimiento;
 const toastRef = useRef();

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
                        <AppText style={styles.title}>{"Detalles de la Factura"}</AppText>
                        <Space />
                        <Space />
                        <FlexWrapper>
                          
                        </FlexWrapper>
                        <Space />
                        <FlexWrapper style={{ alignItems: 'flex-start' }}>
                        
                            
                        </FlexWrapper>
                        <Space />
                        <Space />
                        <View style={{ height: Dimensions.deviceHeight * 0.4 }}>
                            {!loading &&<WebView 
                                style={{ flex : 1 }} 
                                source={{ uri: "http://tododelmundo.com.ar/envios/vista/invoice/index_app.php?token="+data.token}}
                                javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        allowingReadAccessToURL={true}
        
                                
                                />
                            }
                            {loading && <Loader color={Colors.darkblue} style={{ flex: 1 }} />}
                        </View>

                    </View>
                </View>
            </View>

        <Toast ref={toastRef}
          style={{ backgroundColor: '#00000060', borderRadius: 15, alignItems: 'center', justifyContent: 'center', }}
          textStyle={{ color: 'white', fontSize: 16, textAlign: 'center' }}
        />

        </Modal>
    );
};

export default TrackModal;
