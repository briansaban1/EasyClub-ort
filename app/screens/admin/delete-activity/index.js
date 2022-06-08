import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, Text, Modal, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { ErrorActividades, HeaderActivAdmin } from '../../../components';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import WService from '../../../service/WebService';
import { AppText } from '../../../components/styled-components';
import { Colors, Dimensions, Screens } from '../../../constants';
import LottieView from 'lottie-react-native';
import ImageButton from '../../../components/ImageButton';
import { getActividad, getActividades } from '../../../store/user/action';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

const wservice = new WService();


function DeleteActivityScreen() {

    const dispatch = useDispatch();
    const { navigate } = useNavigation();

const profile = useSelector(store => store.user.profile)
//const _actividades = useSelector(store => store.user.actividades)
const _actividades = useSelector(store => store.user.actividades)
const [actividades, setActividades] = useState(_actividades)
const [modalVisible, setModalVisible] = useState(false);


useEffect(() => {
    dispatch(getActividad())
    
},[dispatch])

useEffect(() => {
        setActividades(_actividades)
        
})

console.log(actividades)


function eliminarActividad(ids) {
        console.log(ids)
    wservice.deleteActivity({
        id: ids
    }).then(res => {
       
      if (res.status == 1){
       
        setModalVisible(true);
        dispatch(getActividad());

    }

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



console.log(actividades, 'flag')

    return (
        <>
     <ScrollView  style={styles.container} >
              
           <HeaderActivAdmin
                    title={"Actividades"}
                    description={"Listado de Actividades"}
                />

                
                <View style={{height:20}} />

                {_actividades.length == 0 &&
                
                    <View></View>
                    
                }
                {actividades.map(i => 
                    
              <View style={styles.containerData}>
                <Image
                    source={{
                        uri: i.imagen,
                    }}
                    imageStyle={{ resizeMode: 'stretch' }}
                    style={styles.location}
                />
                <View style={styles.mainContainer} >
                    <Text style={styles.texto}>{i.nombre}</Text>
                    <Text style={styles.textoDatos}>{(moment(i.inicio, 'HH:mm:ss').format('HH:mm A'))} - {(moment(i.fin, 'HH:mm:ss').format('HH:mm A'))}</Text>
                    {i.arancelado == 1 && <View style={{justifyContent:'center', marginTop:3}}><Text style={styles.textoDatoArencelado}>ARANCELADO</Text></View>}
                    {i.arancelado == 0 && <View style={{justifyContent:'center', marginTop:3}}><Text style={styles.textoDatoNoArencelado}>NO ARANCELADO</Text></View>}
                </View>

                <ImageButton
                     style={styles.iconos}
                    source={require('@assets/edit.png')}
                    imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                    
                    onPress={() => {dispatch(getActividades(i.id)); navigate(Screens.ModifyActivity, {data: i}) }}
                    
                    //falta implementacion
                />

                <ImageButton
                     style={styles.iconos}
                    source={require('@assets/eliminarAct.png')}
                    imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                    onPress={() => { eliminarActividad(i.id); dispatch(getActividades(i.id)); }}
                />


                
            </View>
                    
                    )}
                <View style={{height:30}} /> 

                <Modal
                    animationType="slide"
                    transparent={true}
                    style={styles.modal}
                    visible={modalVisible}
                >
                    <StatusBar backgroundColor="#00000040" barStyle="light-content" />

                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <AppText style={styles.title1}>¡Actividad Eliminada!</AppText>
                            <View style={styles.hr} />

                            <Text style={{
                                color: Colors.blue400, fontSize: Dimensions.px15, marginTop: 12,
                                width: '85%', alignItems: 'center', textAlign: 'center',
                                justifyContent: 'center',
                            }}>

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

                                onPress={() => { setModalVisible(false); dispatch(getActividad()) }}
                            >

                                <AppText style={styles.text1}>Aceptar</AppText>
                            </TouchableOpacity>




                        </View>
                    </View>
                </Modal>

            </ScrollView>
        </>
    );
}

export default DeleteActivityScreen;