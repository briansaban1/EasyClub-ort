import React, { useState } from 'react';
import { Image, StyleSheet, View, LayoutAnimation, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Colors, Dimensions } from '../constants';
import { AppText, FlexWrapper } from './styled-components';
import ImageButton from './ImageButton';
import CancelarReservaModal from './CancelarReservaModal'
import { getActividades } from '../store/user/action';
import Button from './Button';
import moment from 'moment';

const styles = StyleSheet.create({

    container: {
        borderColor: '#70707040',
        width: Dimensions.deviceWidth - 60,
       
        marginBottom: 5,
        marginTop: 5,
        alignItems: "center",
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        borderWidth: 1,
        alignSelf: 'center',
        backgroundColor: Colors.white
    },
    mainContainer: {
        width: Dimensions.deviceWidth - 130,
    },
    location: {
        width: 35,
        height: 35,
        marginHorizontal: 10
    },
    icon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        margin: 10
    }

})

const BoldText = styled(AppText)`
  font-weight:bold;
  color:${Colors.darkblue};
  margin-vertical:3px;
`
const Text13 = styled(AppText)`
  font-size:${Platform.OS == 'android' ? 13 : 12};
`

function SubmissionItem({ data, profile, onPress }) {
    const [display, setDisplay] = useState(false)
    
    const [visibleModal, setVisibleModal] = useState(false);

    function visible(modalidad, cancha){
        if(modalidad != "" && cancha != ""){
        return display
        
         };
        };



    return (
        
        <View style={styles.container}>

            <Image
                source={{
                    uri: data.imagen,
                  }}
                imageStyle={{ resizeMode: 'stretch' }}
                style={styles.location}
            />
            <View style={styles.mainContainer} >
                <BoldText>Actividad: {data.nombre}</BoldText>
                <AppText>Reserva: {moment(data.fechaReserva).format('DD/MM/YYYY')} | {(data.horaReserva)}</AppText>
                
                {visible(data.cancha, data.modalidad) &&
                    <View>
                        <BoldText style={{marginTop:7}}>{'Detalles de la Actividad:'}</BoldText>
                        <FlexWrapper style={{ alignSelf: 'flex-start' }}>
                            
                          <View>
                            <View style={{marginTop:5}} >
                                
                                <AppText>Estado: {data.estado}</AppText>  
                                <AppText>Reservado el día: {moment(data.fecha).format('DD/MM/YY')}</AppText>  
                            </View>
                            </View> 
                        </FlexWrapper>
                        <BoldText style={{marginTop:10}}>{`ID ${data.id}`}</BoldText>
                        <View style={{flexDirection:'row', justifyContent:'space-between', width:'90%', paddingLeft:10, paddingRight:10}}>
                        <Button
                        text={"Modificar"}
                        buttonStyle={{width:'43%', backgroundColor: Colors.blue300, position: 'relative',  height: 40, }}
                        onPress={() => {
                            
                        }}
                    />
                        <Button
                        text={"Cancelar"}
                        buttonStyle={{width:'43%', backgroundColor: Colors.darkblue, position: 'relative', height: 40 }}
                        onPress={() => {
                            setVisibleModal(true);
                        }}
                        
                    />
                    </View>

                    </View>                    
                }
            </View>
           <ImageButton
                source={display ? require('@assets/close.png') : require('@assets/dropdown.png')}
                imageStyle={styles.icon}
                
                style={{ position: 'absolute', top: 0, right: 5 }}
                onPress={() => {
                    setDisplay(!display);
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }}
            />
            {visibleModal && <CancelarReservaModal onClose={() => {setVisibleModal(false)}} id={data.id} />}
        </View>
    )
}


export default SubmissionItem;
