import React, { useState } from 'react';
import { Image, StyleSheet, View, LayoutAnimation, Text } from 'react-native';
import styled from 'styled-components';
import { Colors, Dimensions } from '../constants';
import { AppText, FlexWrapper } from './styled-components';
import ImageButton from './ImageButton';
import WService from '../service/WebService';
import { useSelector, useDispatch } from 'react-redux';
import { getActividades } from '../store/user/action';

const BoldText = styled(AppText)`
  font-weight:bold;
  color:${Colors.darkblue};
  margin-vertical:3px;
`
const Text13 = styled(AppText)`
  font-size:${13}px;
`
const wservice = new WService();

function SubmissionActividades({ data, profile, onPress }) {
    const [display, setDisplay] = useState(false)

const [modalVisible, setModalVisible] = useState(false);

const dispatch = useDispatch();


function delAct(data) {
    console.log(data)
    wservice.deleteActivity({
        id: data.id
    }).then(res => {
        setModalVisible(true);
        dispatch(getActividades());
    }).catch(e => {
        Alert.alert(
            '¡Atención!',
            'Por favor aguardá un momento a que procesemos la información',
            [
                { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
            ]
        );
        setModalVisible(false);
        dispatch(getActividades());
    })
}
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
            <BoldText>ID: {data.id} - {data.nombre}</BoldText>

                
            </View>
            
            <ImageButton
                source={require('@assets/trash.png')}
                imageStyle={{width: 22, height: 22, resizeMode: 'contain'}}
                onPress={()=>{delAct(data)}}
            />
        </View>
    )
}


export default SubmissionActividades;

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