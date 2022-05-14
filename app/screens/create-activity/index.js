import React from 'react';
import { ScrollView, StatusBar, Modal, Text, Alert } from 'react-native';
import { Header, Button, AppInput } from '../../components';
import { Colors, Dimensions } from '../../constants';
import CheckBox from 'react-native-check-box'

import styles from './styles';
import { AppText, CenterText, FlexWrapper, Space } from '../../components/styled-components';
import { View } from 'react-native';
import { useState } from 'react';
import WService from '../../service/WebService';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';



const wservice = new WService();


function CreateActivityScreen() {
    const [name, setName]=useState('')
    const [quantity, setQuantity]=useState('')
    const [duty, setDuty]=useState(false)
    const [interval, setInterval]=useState('')
    const [image, setImage]=useState('')
    const [loading, setLoading] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    

    //horarios en base de datos es date, ver compatibilidad
    const [promotionalVal, setPromotionalVal] = useState('')
    const [regularVal, setRegularVal] = useState('')
    const [tipo, setTipo] = useState('')
    const [detail, setDetail] = useState('')   

    function crearActividad() {
        const dutyValue = duty == false ? 0 : 1
        console.log(dutyValue)
            wservice.createActivity({
                name: name,
                quantity:quantity,
                duty:dutyValue,
                promotionalVal: promotionalVal,
                regularVal: regularVal,
                tipo:tipo,
                detail:detail,
                interval:interval,
                image:image
            }).then(res => {
                setLoading(false)
                setName('');
                setQuantity('');
                setDuty('');
                setInterval('');
                setImage('');
                setModalVisible(true);
               
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

    const allow =  name != "" && quantity != "" && interval != "" && image != "";



    return (
        <ScrollView>
        <View style={styles.container}>
            <Header
                title={"Actividad"}
                description={"Crea una nueva actividad"}
            />
            <Space />
            <Space />
            <AppInput
                label={'Nombre de la actividad'}
                onChangeText={setName}
                value={name}
               
            />
            <AppInput
                label={'Cantidad'}
                onChangeText={setQuantity}
                value={quantity}
            />
            <FlexWrapper>
                <CheckBox
                    onClick={() => {
                    setDuty(!duty)
                    }}
                    isChecked={duty}
                    style={{ marginRight: 10, marginLeft: -230}}
                />
                <AppText >{'Arancelado'}</AppText>
            </FlexWrapper>
            {duty==1&&<View>
                <AppInput
                    label={'Valor Promocional'}
                    onChangeText={setPromotionalVal}
                    value={promotionalVal}
                />
                <AppInput
                    label={'Valor Regular'}
                    onChangeText={setRegularVal}
                    value={regularVal}
                />
                <AppInput
                    label={'Tipo'}
                    onChangeText={setTipo}
                    value={tipo}
                />
                <AppInput
                    label={'Detalle'}
                    onChangeText={setDetail}
                    value={detail}
                />
            </View>}
            <AppInput
                label={'Intervalo'}
                onChangeText={setInterval}
                value={interval}
            />
            <AppInput
                label={'Imagen'}
                onChangeText={setImage}
                value={image}
            />
             <Space height={30} />
            <Button
                disabled={!name||!quantity||!interval||!image||!allow}
                loading={loading}
                text={"Insertar"}
                onPress={() => {crearActividad()}}
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
                            <AppText style={styles.title1}>¡Datos recibidos!</AppText>
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
                                onPress={() => setModalVisible(!modalVisible)}
                                >

                                <AppText style={styles.text1}>Aceptar</AppText>
                            </TouchableOpacity>

                           


                        </View>
                    </View>
                </Modal>

        </View>
        </ScrollView>
    );
}

export default CreateActivityScreen;
