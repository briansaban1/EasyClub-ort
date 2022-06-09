import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Image, StatusBar, Text } from 'react-native';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import WService from '../service/WebService';
import ImageButton from './ImageButton';
import { AppText, FlexWrapper, Loader, Space } from './styled-components';
import { Header, Steps, AppInputModal, Button, SearchInput } from '.';
import colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import Screens from '../constants/screens';
import { useSelector, useDispatch } from 'react-redux';
import { getSubmissions } from '../store/user/action';




const wservice = new WService();


const CancelarReservaModal = (
    id,
    onClose,
) => {

    
    const { navigate } = useNavigation();

    const profile = useSelector(store => store.user.profile)
    const dispatch = useDispatch();



//se pasa el id de la reserva a la api y se coloca la reserva como estado 'cancelada' en la base de datos
    function cancelarReserva ({id}) {
        console.log(id, profile.id_usuario, 'FLAG-1!')        
        
        wservice.cancelarReserva({
            id
        }).then(response => {
            if (response.status == 1) {
                //si la cancelacion es exitosa, se redirecciona a la ventana de exito
                console.log(response.status)
                //se actualiza el listado de reservas
                dispatch(getSubmissions(profile.id_usuario));
                id.onClose();
                navigate(Screens.Reservas);
            }
        })
    }

 

    return (
        
        <Modal
            transparent={true}
            visible={true}
            animationType={'fade'}
            onRequestClose={() => {
                id.onClose()
            }}>
            <View style={styles.body}>
                <View style={styles.container}>
                    <ImageButton
                        source={Images.Close}
                        imageStyle={styles.close}
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => {
                            id.onClose()
                        }}/>
                    <View style={styles.mainContainer}>
                        <AppText style={styles.subtitle}>{"¿Estás seguro de cancelar la reserva?"}</AppText>
                   
                        <View style={{ height: 25 }} />

                      <View style={{flexDirection:'row', width:'100%', justifyContent:'space-between'}}>
                    <Button
                        text={"Confirmar"}
                        loading={false}
                        buttonStyle={{width:'47%', backgroundColor:'#36E26F'}}
                        onPress={() => {{
                            cancelarReserva(id);
                            dispatch(getSubmissions(profile.id_usuario));
                            id.onClose();
                            navigate(Screens.Reservas);}
                        }}
                    />
                    <Button
                        text={"Cancelar"}
                        buttonStyle={{width:'47%'}}
                        onPress={() => {
                            id.onClose();
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

export default CancelarReservaModal;



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