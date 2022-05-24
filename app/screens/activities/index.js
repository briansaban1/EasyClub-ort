import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, Text, Modal, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header, SearchInput, SubmissionActividades, ErrorActividades, HeaderActivAdmin } from '../../components';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import WService from '../../service/WebService';
import { AppText, FlexWrapper } from '../../components/styled-components';
import { getActividad } from '../../store/user/action';
import { Colors, Dimensions, Screens } from '../../constants';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import ImageButton from '../../components/ImageButton';


const wservice = new WService();


function ActivitiesScreen() {

const profile = useSelector(store => store.user.profile)

//const _actividades = useSelector(store => store.user.actividades)
const [actividades, setActividades] = useState([' '])
const [_actividades, setActiv] = useState(actividades)

const [modalVisible, setModalVisible] = useState(false);


useEffect(() => {
        wservice.getActividades().then(response => {
            if (response.status == 1) {

                setActividades(response.data.map(item => ({
                    id: item.id,
                    imagen: item.imagen,
                    nombre: item.nombre,
                    
                })));
                //setNoHayMas(response.data.pop())
                //console.log(horarios)
            }
        })
    }, [])

console.log(actividades)


function eliminarActividad(ids) {
        console.log(ids)
    wservice.deleteActivity({
        id: ids
    }).then(res => {
      if (res.status == 1){
       
        setModalVisible(true)
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

const { navigate } = useNavigation();
const dispatch = useDispatch();


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
                
                    <ErrorActividades/> 
                    
                }
                {actividades.map(actividad => 
                    
              <View style={styles.containerData}>
                <Image
                    source={{
                        uri: actividad.imagen,
                    }}
                    imageStyle={{ resizeMode: 'stretch' }}
                    style={styles.location}
                />
                <View style={styles.mainContainer} >
                    <Text style={styles.texto}>ID: {actividad.id} - {actividad.nombre}</Text>


                </View>

                <ImageButton
                     style={styles.iconos}
                    source={require('@assets/edit.png')}
                    imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                    onPress={() => { dispatch(getActividad(actividad.id)); navigate(Screens.ModifyActivity, {data: actividad.id}) }}
                    //falta implementacion
                />

                <ImageButton
                     style={styles.iconos}
                    source={require('@assets/eliminarAct.png')}
                    imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                    onPress={() => { eliminarActividad(actividad.id) }}
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

                                onPress={() => { setModalVisible(false) }}
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

export default ActivitiesScreen;