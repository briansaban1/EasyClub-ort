import React, { useState } from 'react';
import { Image, StyleSheet, View, LayoutAnimation } from 'react-native';
import styled from 'styled-components';
import { Colors, Dimensions } from '../constants';
import { AppText, FlexWrapper } from './styled-components';
import ImageButton from './ImageButton';


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
        width: Dimensions.deviceWidth - 170,
    },
    location: {
        width: 40,
        height: 40,
        marginHorizontal: 10
    },
    icon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        margin: 10
    },


})

const BoldText = styled(AppText)`
  font-weight:bold;
  color:${Colors.darkblue};
  margin-vertical:3px;
`
const Text13 = styled(AppText)`
  font-size:${13}px;
`

function SubmissionAlerta({ data, profile, onPress }) {
    const [display, setDisplay] = useState(false)



function arancel(arancel){
    if(arancel == 1){
    const arancelado = <BoldText>ARANCELADO</BoldText>
    
    return arancelado
     };
    };


function visible(modalidad){
if(modalidad != ""){
const visibilidad = <AppText>Modalidad: <BoldText>{data.modalidad}</BoldText></AppText>

return visibilidad
 };
};



const valores = data.modalidad

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
                <BoldText>Deporte: {data.nombre}</BoldText>
                <AppText>Disponibilidad: {data.cantidad}</AppText>
                
                <View>{(visible(data.modalidad))}</View>
                <View>{(arancel(data.arancelado))}</View>
                
            </View>
            
            <ImageButton
                source={require('@assets/ios-arrow-right.png')}
                imageStyle={{width: 22, height: 22, resizeMode: 'contain'}}
                onPress={()=>{onPress&&onPress(data)}}
            />
        </View>
    )
}


export default SubmissionAlerta;
