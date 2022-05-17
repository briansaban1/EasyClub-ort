import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, Modal, Text, ScrollView, StatusBar } from 'react-native';
import styled from 'styled-components';
import { Colors, Dimensions } from '../constants';
import { AppText, FlexWrapper } from './styled-components';
import ImageButton from './ImageButton';
import LottieView from 'lottie-react-native';
import WService from '../service/WebService';
import { TouchableOpacity } from 'react-native-gesture-handler';
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

const [idActividad, setIdActividad] = useState(data.id);

console.log(idActividad, 'id')

const dispatch = useDispatch();

useEffect(() => {
    dispatch(getActividades());
  }, [])


function delAct(data) {
    console.log(data)
    wservice.deleteActivity({
        id: data.id
    }).then(res => {
   
        dispatch(getActividades());
        console.log(res)
        setModalVisible(true);


    }).catch(e => {
        Alert.alert(
            '¡Atención!',
            'Por favor aguardá un momento a que procesemos la información',
            [
                { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
            ]
        );
        setModalVisible(false);
    })
};

    return (
        <ScrollView>
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
                imageStyle={{width: 21, height: 21, resizeMode: 'contain'}}
                onPress={()=>{delAct(data)}}
            />

<Modal
                    animationType="slide"
                    transparent={true}
                    style={styles.modal}
                    visible={modalVisible}
                    >
                    <StatusBar backgroundColor="#00000040"  barStyle="light-content"/>

                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <AppText style={styles.title1}>¡Actividad Eliminada!</AppText>
                            <View style={styles.hr} />

                          <Text style={{color: Colors.blue400, fontSize: Dimensions.px15, marginTop:12, 
                                width: '85%', alignItems: 'center', textAlign: 'center',
                                justifyContent: 'center',}}>
                                     
                            </Text>
                            <View style={styles.flexContainer1}>
                            <LottieView source={require('@assets/check.json')}
                    autoPlay={true}
                    loop={false}
                    resizeMode="cover" 
                    style={{ width: 110, height: 110, marginVertical: 5, alignSelf: 'center' }}
                    />


                            </View>
                            

                            <TouchableOpacity style={styles.button1}
                                onPress={() => {setModalVisible(!modalVisible)}}
                                >

                                <AppText style={styles.text1}>Aceptar</AppText>
                            </TouchableOpacity>

                           


                        </View>
                    </View>
                </Modal>
        </View>
                </ScrollView>

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
    color: Colors.blue400,
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
