import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Modal, StatusBar, TouchableOpacity, Alert, FlatList} from 'react-native';
import { Header, ErrorActividades } from '../../../components';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import WService from '../../../service/WebService';
import { AppText, CenterView } from '../../../components/styled-components';
import { Colors, Dimensions, Screens } from '../../../constants';
import LottieView from 'lottie-react-native';
import ImageButton from '../../../components/ImageButton';
import { getSocio, getSocios } from '../../../store/user/action';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';


const wservice = new WService();


function SocioScreen({}) {

    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    const profile = useSelector(store => store.user.profile)
    const _socios = useSelector(store => store.user.socios)
    const [socios, setSocios] = useState(_socios)

    console.log(_socios, socios, profile)

    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);




const Container = styled(CenterView)`
  height: 47px;
  width:47px;
  border-radius: 47px;
  align-items: center;
  justify-content: center;
  border-color: #ADE6FE ;
  border-width:2px;
  backgroundColor: #fff;
`;

    useEffect(() => {
        //dispatch(getActividad())
        dispatch(getSocio())

    }, [dispatch])

    useEffect(() => {
        //setActividades(_actividades)
        setSocios(_socios)

    })

    console.log(_socios, 'listado')


    function eliminarSocio(idUsuario) {
        console.log(idUsuario, 'id usuario')
        wservice.deleteSocio({
            id: idUsuario,
        }).then(res => {
            console.log(res, 'respuestaaaa')
            if (res.status == 1) {
                setModalVisible(true);
                dispatch(getSocios());
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



    function activarSocio(idUsuario) {
        console.log(idUsuario, 'id usuario activar')
        wservice.activarSocio({
            id: idUsuario,
        }).then(res => {
            console.log(res)
            if (res.status == 1) {
                setModal2Visible(true);
                dispatch(getSocios());
            }
        }).catch(e => {
            Alert.alert(
                '¡Atención!',
                'Por favor aguardá un momento a que procesemos la información',
                [
                    { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
                ]
            );
            setModal2Visible(false);
        })
    };



    // const [searchValue, setSearchValue] = useState('')

    // useEffect(() => {
    //     handleSearch();
    // }, [searchValue])

    // function handleSearch() {
    //     if (searchValue) {
    //         const filteredData = _socios.filter(data => {
    //             console.log(data.id_usuario, 'data ')
    //             const searchData = data && data.id_usuario.toUpperCase()
    //             const textData = searchValue.toUpperCase()
    //             return searchData.indexOf(textData) > -1
    //         })
    //         setSocios(filteredData)
    //     } else {
    //         setSocios(_socios)
    //     }
    // }



    return (
        <>
            <ScrollView style={styles.container} >

                <Header
                    title={"Socios"}
                    description={"Listado de Socios"}/>

                <View style={{ height: 20 }} />

                {_socios.length == 0 &&

                    //<ErrorActividades />
                    <View></View>
                }
                {socios.map(i =>

                    <View style={styles.containerData}>

                        <Container>
                            <AppText>{(i.tx_nombre).charAt(0)}{(i.tx_apellido).charAt(0)}</AppText>
                        </Container>

                        <View style={styles.mainContainer} >
                            <Text style={styles.texto}>Id Usuario: {i.id_usuario}</Text>
                            <Text style={styles.textoDatos}>{i.tx_nombre} {i.tx_apellido}</Text>
                            <Text style={styles.textoDatos}>{i.tx_correo}</Text>
                            {i.id_TipoUsuario == 3 && <View style={{justifyContent:'center', marginTop:3}}><Text style={styles.textoDatosBaja}>USUARIO BAJA</Text></View>}

                        </View>

                        <ImageButton
                            style={styles.iconos}
                            source={require('@assets/edit.png')}
                            imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}

                            onPress={() => { dispatch(getSocios(i.id_usuario)); navigate(Screens.ModifySocio, { data: i }) }}

                        />

                        {i.id_TipoUsuario != 3 ? <ImageButton
                            style={styles.iconos}
                            source={require('@assets/eliminarAct.png')}
                            imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                            onPress={() => { eliminarSocio(i.id_usuario); dispatch(getSocios(i.id_usuario)); }}
                        /> : <ImageButton
                        style={styles.iconos}
                        source={require('@assets/user-add.png')}
                        imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                        onPress={() => { activarSocio(i.id_usuario); dispatch(getSocios(i.id_usuario)); }}
                    />}



                    </View>

                )}
                <View style={{ height: 30 }} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    style={styles.modal}
                    visible={modalVisible}
                >
                    <StatusBar backgroundColor="#00000040" barStyle="light-content" />

                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <AppText style={styles.title1}>¡Socio Eliminado!</AppText>
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

                                onPress={() => { setModalVisible(false); dispatch(getSocio()) }}
                            >

                                <AppText style={styles.text1}>Aceptar</AppText>
                            </TouchableOpacity>




                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    style={styles.modal}
                    visible={modal2Visible}
                >
                    <StatusBar backgroundColor="#00000040" barStyle="light-content" />

                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <AppText style={styles.title1}>¡Socio Activado!</AppText>
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

                                onPress={() => { setModal2Visible(false); dispatch(getSocio()) }}
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

export default SocioScreen;