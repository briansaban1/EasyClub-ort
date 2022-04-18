import React, { useState } from 'react';
import { Image, StyleSheet, View, LayoutAnimation, Alert } from 'react-native';
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
  font-size:${13}px;
`

function InvoiceItem({ data, profile, onPress }) {
    const [display, setDisplay] = useState(false)
    return (
        <View style={styles.container}>
            <Image
                source={require('@assets/transporte.png')}
                imageStyle={{ resizeMode: 'stretch' }}
                style={styles.location}
            />
            <View style={styles.mainContainer} >
                <BoldText>ENVÍO {data.correo}</BoldText>
                <AppText>{data.tipo}</AppText>
                <BoldText>{data.seguimiento}</BoldText>
                <AppText>Bultos: {data.bultos}</AppText>
                {display &&
                    <View>
                        <BoldText style={{marginTop:7}}>{'Detalles del Paquete:'}</BoldText>
                        <FlexWrapper style={{ alignSelf: 'flex-start' }}>
                        <Image
                                source={require('@assets/track.png')}
                                style={{ width: 28, height: 90, resizeMode: 'contain' }}
                            />
                          <View>
                            <View style={{marginTop:5}} >
                                <Text13>{'Sucursal Transporte\n(Caballito)'}</Text13>
                            </View>    
                            <View style={{marginTop:30}} >    
                                
                            <Text13>{profile.tx_direccion.substring(0, 27)}</Text13>
                            <Text13 style={styles.item_name23}>({data.tipo})</Text13>
                            </View>
                            </View> 
                        </FlexWrapper>
                        <BoldText style={{marginTop:10}}>{`ID ${data.id}`}</BoldText>
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
            <ImageButton
                source={require('@assets/three-dots.png')}
                imageStyle={styles.icon}
                style={{ position: 'absolute', bottom: 0, right: 5 }}
                onPress={()=>{onPress&&onPress(data)}}
            />
        </View>
    )
}


export default InvoiceItem;
