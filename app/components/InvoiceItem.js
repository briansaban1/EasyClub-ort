import React, { useState } from 'react';
import { Image, StyleSheet, View, LayoutAnimation, Alert } from 'react-native';
import styled from 'styled-components';
import { Colors, Dimensions } from '../constants';
import { AppText, FlexWrapper } from './styled-components';
import ImageButton from './ImageButton';
import moment from 'moment'


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
        width: Dimensions.deviceWidth - 140,
        marginTop: 0
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
  font-size:${14}px;
  margin-vertical:2px;
`

function InvoiceItem({ data, profile, onPress }) {
    const [display, setDisplay] = useState(false)
    return (
        <View style={styles.container}>
            <Image
                source={require('@assets/pago.png')}
                imageStyle={{ resizeMode: 'stretch' }}
                style={styles.location}
            />
            <View style={styles.mainContainer} >
                
                <BoldText>PAGO {data.concepto}</BoldText>
                <AppText>{`Fecha: ${moment(data.fecha).format('DD/MM/YYYY')}`}</AppText>
                {display &&
                    <View>
                        <BoldText style={{marginTop:7}}>{'Detalles del Pago:'}</BoldText>
                        <FlexWrapper style={{ alignSelf: 'flex-start' }}>
                          <View>
                            <View style={{marginTop:0, marginLeft:5}} >
                              
                            <Text13>Importe: ${data.valor}</Text13>     
                            <Text13>Detalle: {data.concepto}</Text13>    
                            <Text13>Pago ID: #{data.id_pago}</Text13>                            
                            </View>
                            </View> 
                        </FlexWrapper>
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
           
        </View>
    )
}


export default InvoiceItem;
