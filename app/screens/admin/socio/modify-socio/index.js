import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, Modal, Text, Alert, Image, TouchableOpacity, } from 'react-native';
import { Header, Button, AppInput, DropDownGrande, DropDown } from '../../../../components';
import { Colors, Dimensions } from '../../../../constants';
import styles from './styles';
import { AppText, CenterText, FlexWrapper, Space } from '../../../../components/styled-components';
import { View } from 'react-native';
import WService from '../../../../service/WebService';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getActividades, getHorarios, getSocios } from '../../../../store/user/action';
import { isValidEmail } from '../../../../utils';



const wservice = new WService();


function ModifySocioScreen(data) {

    const dispatch = useDispatch();


    const [ids, setIds] = useState('')
    const [usuario, setUsuario] = useState('')
    const [email, setEmail] = useState('')


    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [direccion, setDireccion] = useState('')
    const [provincia, setProvincia] = useState('')
    const [localidad, setLocalidad] = useState('')
    const [postal, setPostal] = useState('')
    const [telefono, setTelefono] = useState('')
    const [whatsapp, setWhatsapp] = useState('')

    const [errors, setErrors] = useState({
        correo: true
    })


    const [loading, setLoading] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    //se setean los datos recibidos por parametro
    useEffect(() => {
        setNombre(data.route.params.data.tx_nombre)
        setApellido(data.route.params.data.tx_apellido)
        setDireccion(data.route.params.data.tx_direccion)
        setProvincia(data.route.params.data.tx_provincia)
        setLocalidad(data.route.params.data.tx_localidad)
        setPostal(data.route.params.data.tx_cod)
        setTelefono(data.route.params.data.tx_telefono)
        setWhatsapp(data.route.params.data.tx_whatsapp)

        setIds(data.route.params.data.id_usuario)
        setEmail(data.route.params.data.tx_correo)
        setUsuario(data.route.params.data.tx_username)

    }, [data])

//se valida que el mail ingresado sea valido y no se encuentre en la base de datos
    function checkAttribute(type, value) {
        wservice.checkExistingUser(`tx_${type}`, value)
            .then(response => {
                setAttempted({
                    ...attempted,
                    [type]: true
                })
                setErrors({
                    ...errors,
                    [type]: response.status == 'valid' ? false : true
                })
                if (response.status == 'valid') {
                    setEmail({ [type]: value })
                }
            })
    }


 //se actualiza los datos del socio pasando por parametro los datos ingresados a la api
 //y si esta todo ok se llama al metodo para actualizar el listado de los socios con los últimos cambios 

    function actualizarSocio() {
        wservice.updateSocio({
            id: ids,
            nombre: nombre,
            apellido: apellido,
            direccion: direccion,
            mail: email,
            provincia: provincia,
            localidad: localidad,
            postal: postal,
            telefono: telefono,
            whatsapp: whatsapp
        }).then(res => {
            setLoading(false)
            setModalVisible(true);
            dispatch(getSocios());

        }).catch(e => {
            Alert.alert(
                '¡Atención!',
                'Por favor aguardá un momento a que procesemos la información',
                [
                    { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
                ]
            );
            setLoading(false);
            setModalVisible(false);

        })

    }

    const allow = nombre != "" && apellido != "" && direccion != "" && provincia != "" && localidad != "" && postal != "" && telefono != "";



    return (
        <ScrollView style={styles.container}>

            <View>
                <Header
                    title={"Socios"}
                    description={"Actualización del Socio"}
                />
                <Space />
                <Space />
                <AppInput
                    label={'Nombre'}
                    onChangeText={setNombre}
                    value={nombre}
                />

                <AppInput
                    label={'Apellido'}
                    onChangeText={setApellido}
                    value={apellido}
                />

                <AppInput
                    label={'E-mail'}
                    onChangeText={(text) => {
                        setEmail(text.trim())
                        if (isValidEmail(text)) {
                            checkAttribute('tx_correo', text)
                        } else {
                            setErrors({
                                ...errors,
                                correo: true
                            })
                        }
                    }}
                    errorMessage={errors.email}
                    value={email}
                />


                <AppInput
                    label={'Dirección'}
                    onChangeText={setDireccion}
                    value={direccion}
                />


                <View style={{ width: '85%' }}>
                    <DropDownGrande
                        label={"Provincia"}
                        options={['BUENOS AIRES', 'CAPITAL FEDERAL', 'CATAMARCA', 'CHACO', 'CHUBUT',
                            'CÓRDOBA', 'CORRIENTES', 'ENTRE RÍOS', 'FORMOSA', 'JUJUY', 'LA PAMPA', 'LA RIOJA', 'MENDOZA', 'MISIONES',
                            'NEUQUÉN', 'RÍO NEGRO', 'SALTA', 'SAN JUAN', 'SAN LUIS', 'SANTA CRUZ', 'SANTA FE', 'SANTIAGO DEL ESTERO',
                            'TIERRA DEL FUEGO', 'TUCUMÁN']}
                        value={provincia}
                        onSelect={(idx, value) => setProvincia(value)}
                    />
                </View>

                <AppInput
                    label={'Localidad'}
                    onChangeText={setLocalidad}
                    value={localidad}
                />

                <AppInput
                    label={'Cod. Postal'}
                    onChangeText={setPostal}
                    value={postal}
                    keyboardType="numeric"
                />

                <AppInput
                    label={'Teléfono'}
                    onChangeText={setTelefono}
                    value={telefono}
                    keyboardType="numeric"
                />

                <AppInput
                    label={'WhatsApp'}
                    onChangeText={setWhatsapp}
                    value={whatsapp}
                    keyboardType="numeric"
                />


                <Space height={30} />
                <Button
                    disabled={!nombre || !apellido || !direccion || !provincia || !allow}
                    loading={loading}
                    text={"Actualizar Datos"}
                    onPress={() => { actualizarSocio() }}
                />
                <View style={{ marginTop: 40 }}></View>

            </View>




            <Modal
                animationType="slide"
                transparent={true}
                style={styles.modal}
                visible={modalVisible}
            >
                <StatusBar backgroundColor="#00000040" barStyle="light-content" />

                <View style={styles.modal}>
                    <View style={styles.modalContainer}>
                        <AppText style={styles.title1}>¡Datos actualizados!</AppText>
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
                        //onPress={() => { setModalVisible(false) }}
                        >

                            <AppText style={styles.text1}>Aceptar</AppText>
                        </TouchableOpacity>




                    </View>
                </View>
            </Modal>

        </ScrollView>
    );
}

export default ModifySocioScreen;
