import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, Text, Modal, StatusBar, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Header, SearchInput, SubmissionActividades, ErrorActividades } from '../../components';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import WService from '../../service/WebService';
import { AppText, FlexWrapper } from '../../components/styled-components';
import { Colors, Dimensions, Screens } from '../../constants';
import LottieView from 'lottie-react-native';
import ImageButton from '../../components/ImageButton';


const wservice = new WService();


function DeleteActivityScreen() {

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
    })

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





console.log(actividades, 'flag')

    return (
        <>
     <ScrollView  style={styles.container} >
                <Header
                    title={"Eliminar actividad"}
                    description={'Seleccioná el ícono de la derecha para borrar una actividad.'}
                />
                
                <View style={{height:20}} />

                {_actividades.length == 0 &&
                
                    <ErrorActividades/> 
                    
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
                    <Text style={styles.texto}>ID: {i.id} - {i.nombre}</Text>


                </View>

                <ImageButton
                     style={styles.iconos}
                    source={require('@assets/edit.png')}
                    imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                    onPress={() => { navigator(Screens.EditActivity) }}
                    //falta implementacion
                />

                <ImageButton
                     style={styles.iconos}
                    source={require('@assets/eliminarAct.png')}
                    imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                    onPress={() => { eliminarActividad(i.id) }}
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

export default DeleteActivityScreen;