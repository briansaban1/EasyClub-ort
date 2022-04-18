import React, { useState, useRef } from 'react';
import { Image, StyleSheet, View, LayoutAnimation, TouchableHighlight, Clipboard } from 'react-native';
import styled from 'styled-components';
import { Colors, Dimensions } from '../constants';
import { AppText, FlexWrapper, AppTextLight } from './styled-components';
import ImageButton from './ImageButton';
import moment from 'moment';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Toast, { DURATION } from 'react-native-easy-toast'


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
        paddingBottom: 10,
        paddingTop: 10,
        flexDirection: 'row',
        borderWidth: 1,
        alignSelf: 'center',
        backgroundColor: Colors.white
    },
    mainContainer: {
        width: Dimensions.deviceWidth - 200,
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

function SubmissionWallet({ data, profile, onPress }) {
    const [display, setDisplay] = useState(false)
    const toastRef = useRef();


    if (data.puntos >= 0) {
        var result = 'Has abonado';
        var signo = '+'
    } else {
        var result = 'Has gastado';
        var signo = ''
        var codigo = data.tipo;
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('@assets/wallet1.png')}
                imageStyle={{ resizeMode: 'stretch' }}
                style={styles.location}
            />
            <View style={styles.mainContainer} >
                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                    <BoldText>{result} U$S {data.monto}</BoldText>
                </View>
                <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                    <AppText>El día </AppText><AppText>{moment(data.fecha).format("DD MMM YYYY")}</AppText>
                </View>
               


            </View>

              
            <ImageButton
                source={require('@assets/ios-arrow-right.png')}
                imageStyle={{width: 22, height: 22, resizeMode: 'contain'}}
                onPress={()=>{onPress&&onPress(data)}}
            />

        <Toast ref={toastRef}
          style={{ backgroundColor: '#00000060', borderRadius: 15, alignItems: 'center', justifyContent: 'center', }}
          textStyle={{ color: 'white', fontSize: 16, textAlign: 'center' }}
        />
        </View>
    )
}


export default SubmissionWallet;
