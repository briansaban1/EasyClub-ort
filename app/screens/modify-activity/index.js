import React, { useState, useEffect } from 'react';
import { ScrollView, StatusBar, Modal, Text, Alert, Image, TouchableOpacity, } from 'react-native';
import { Header, Button, AppInput, DropDownGrande, DropDown } from '../../components';
import { Colors, Dimensions } from '../../constants';
import CheckBox from 'react-native-check-box'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import styles from './styles';
import { AppText, CenterText, FlexWrapper, Space } from '../../components/styled-components';
import { View } from 'react-native';
import WService from '../../service/WebService';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getActividades, getHorarios } from '../../store/user/action';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment, { min } from 'moment';



const wservice = new WService();

const createFormData = (photo, body) => {
    const data = new FormData();

    data.append("fileToUpload", {
        name: photo.fileName,
        type: photo.type,
        uri:
            Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });

    Object.keys(body).forEach(key => {
        data.append(key, body[key]);
    });

    return data;
};


function CreateActivityScreen(data) {

console.log(data.route.params.data.inicio, data.route.params.data.fin ,'aca')


const [ids, setIds] = useState('')
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [duty, setDuty] = useState(false)
    const [dutyImg, setDutyImg] = useState(false)
    const [interval, setInterval] = useState('')
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [fileName, setFileName] = useState('')
    const [file, setFile] = useState('')
    

    const webFile = `https://easyclub.online/app/${file}`


    //horarios en base de datos es date, ver compatibilidad
    const [promotionalVal, setPromotionalVal] = useState('')
    const [regularVal, setRegularVal] = useState('')
    const [tipo, setTipo] = useState('')
    const [detail, setDetail] = useState('')

    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [isDatePickerVisibleInicio, setDatePickerVisibilityInicio] = useState(false);
    const [isDatePickerVisibleFin, setDatePickerVisibilityFin] = useState(false);

    useEffect(()=>{
        setName(data.route.params.data.nombre)
        setQuantity(data.route.params.data.cantidad)
        setDuty(data.route.params.data.arancelado)
        setInterval(data.route.params.data.intervalo)
        setPromotionalVal(data.route.params.data.valorPromocional)
        setRegularVal(data.route.params.data.valorRegular)
        setHoraInicio(moment(data.route.params.data.inicio, 'HH:mm'))
        setHoraFin(moment(data.route.params.data.fin, 'HH:mm'))
        setTipo(data.route.params.data.tipo)
        setDetail(data.route.params.data.detalle)
        setFile(data.route.params.data.imagen)
        setIds(data.route.params.data.id)
    
    },[data])

    const showDatePickerInicio = () => {
        setDatePickerVisibilityInicio(true);
    };

    const hideDatePickerInicio = () => {
        setDatePickerVisibilityInicio(false);
    };

    const handleConfirmInicio = (horaInicio) => {
        setHoraInicio(horaInicio)
        hideDatePickerInicio();
    };


    const showDatePickerFin = () => {
        setDatePickerVisibilityFin(true);
    };

    const hideDatePickerFin = () => {
        setDatePickerVisibilityFin(false);
    };

    const handleConfirmFin = (horaFin) => {
        setHoraFin(horaFin)
        hideDatePickerFin();
    };

    console.log(moment(horaInicio).format('HH:mm'), moment(horaFin).format('HH:mm'), data.route.params.data.tipo, 'horaInicioooooo1')




    const dispatch = useDispatch();

    function chooseAttachmentFile() {
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
        }, (error, res) => {
            if (res != null) {
                console.log(res)
                fileUploadApi(res)
                setFileName(res.fileName)
            }
        });
    };

    function fileUploadApi(photo) {
        setLoading(true)
        fetch("https://easyclub.online/app/FileUpload.php", {
            method: "POST",
            body: createFormData(photo, { userId: "123" })
        })
            .then(response => response.json())
            .then(response => {
                setLoading(false)
                console.log(response, 'error aca')
                if (response.status == "true") {
                    setFile(response.url)

                } else {
                    alert('Por favor seleccioná un archivo');
                }

            })
            .catch(error => {
                setLoading(false)
                alert("Error al cargar el archivo");
            });
    };

    console.log(webFile,'<- webfile', file, '<- file') 

    function actualizarActividad() {
        const dutyValue = duty == false ? 0 : 1
        console.log(dutyValue)
        wservice.updateActivity({
            id: ids,
            name: name,
            quantity: quantity,
            duty: dutyValue,
            promotionalVal: promotionalVal,
            regularVal: regularVal,
            tipo: tipo,
            detail: detail,
            interval: interval,
            image: dutyImg == false ? file : webFile,
            horaIni: moment(horaInicio).format('HH:mm'),
            horafin: moment(horaFin).format('HH:mm')
        }).then(res => {
            setLoading(false)
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
            setLoading(false);
            setModalVisible(false);

        })

    }

    const allow = name != "" && quantity != "" && interval != "" && file != "" && horaInicio != "" && horaFin != "";



    return (
        <ScrollView style={styles.container}>

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



            <View>
                <Header
                    title={"Actividad"}
                    description={"Actualización de la actividad"}
                />
                <Space />
                <Space />
                <AppInput
                    label={'Nombre de la actividad'}
                    onChangeText={setName}
                    value={name}
                />

                <AppInput
                    label={'Cantidad de lugares por hora'}
                    onChangeText={setQuantity}
                    value={quantity}
                />

                <FlexWrapper>
                    <View style={{ flexDirection: 'row', width: '85%', marginTop: 10 }}>
                        <View style={{ width: '50%', }}>
                            <Text style={styles.text3}>Hora Inicio</Text>

                            <TouchableOpacity style={styles.buttonCalendar} onPress={showDatePickerInicio}>
                                <Text style={styles.textDate}>{horaInicio == "" ? "HH:MM" : moment((horaInicio)).format('hh:mm A')}</Text>

                            </TouchableOpacity>

                            <DateTimePicker
                                isVisible={isDatePickerVisibleInicio}
                                mode="time"
                                format="hh:mm A"
                                onConfirm={handleConfirmInicio}
                                onCancel={hideDatePickerInicio}
                                minuteInterval={30}
                            />
                        </View>
                        <View style={{ width: '50%', }}>
                            <Text style={styles.text3}>Hora Fin</Text>

                            <TouchableOpacity style={styles.buttonCalendar} onPress={showDatePickerFin}>
                                <Text style={styles.textDate}>{horaFin == "" ? "HH:MM" : moment((horaFin)).format('hh:mm A')}</Text>

                            </TouchableOpacity>

                            <DateTimePicker
                                isVisible={isDatePickerVisibleFin}
                                mode="time"
                                format="hh:mm A"
                                onConfirm={handleConfirmFin}
                                onCancel={hideDatePickerFin}
                                minuteInterval={30}
                            />
                        </View>

                    </View>
                </FlexWrapper>


                <View style={{ width: '85%' }}>
                    <DropDownGrande
                        label={"Intervalo (en minutos)"}
                        options={['10', '20', '30', '40', '50', '60']}
                        value={interval}
                        onSelect={(idx, value) => setInterval(value)}
                    />
                </View>

                <FlexWrapper style={{ marginTop: 15 }}>
                    <CheckBox
                        onClick={() => {
                            setDutyImg(!dutyImg)
                        }}
                        isChecked={dutyImg}
                        style={{ marginRight: 10 }}
                    />
                    <AppText >{'¿Deseás cambiar la Imagen?'}</AppText>
                </FlexWrapper>

                {dutyImg == 1 ?<View style={{ marginTop: 10 }}>


                    <AppText style={styles.text2}>{"Adjuntá la Imagen"}</AppText>

                    <FlexWrapper style={{}}>
                        <View style={{
                            color: Colors.blue400,
                            borderColor: '#A8B3C8',
                            borderWidth: 1,
                            width: '85%',
                            borderRadius: 5,
                            height: 95,
                            borderStyle: 'dotted',
                            backgroundColor: '#fff'
                        }}>
                            <TouchableOpacity
                                onPress={chooseAttachmentFile}
                            >
                                <FlexWrapper style={{ alignSelf: 'center' }}>
                                    <View style={{ flexDirection: 'row', marginTop: 35 }}>
                                        <Image
                                            source={require('@assets/file.png')}
                                            style={{ width: 20, height: 25, marginRight: 10 }}
                                        />

                                        <AppText>{fileName || "Seleccioná un archivo…"}</AppText>

                                    </View>
                                </FlexWrapper>
                            </TouchableOpacity>
                        </View>
                    </FlexWrapper>
                </View> : <View style={{
                            color: Colors.blue400,
                            borderColor: '#A8B3C8',
                            borderWidth: 1,
                            width: '85%',
                            borderRadius: 5,
                            height: 70,
                            borderStyle: 'dotted',
                            backgroundColor: '#fff',
                            justifyContent:'center',
                            alignItems:'center',
                            alignSelf:'center',
                            marginTop:10,
                        }}>
                            <FlexWrapper style={{}}>
                    
                <Image
                    source={{
                        uri: file,
                    }}
                    imageStyle={{ resizeMode: 'stretch' }}
                    style={styles.location}
                />
                    </FlexWrapper>
                    </View>}

                <FlexWrapper style={{ marginTop: 15 }}>
                    <CheckBox
                        onClick={() => {
                            setDuty(!duty)
                        }}
                        isChecked={duty}
                        style={{ marginRight: 10 }}
                    />
                    <AppText >{'¿La actividad es arancelada?'}</AppText>
                </FlexWrapper>


                {duty == 1 && <View style={{ marginTop: 15 }}>

                    <AppInput
                        label={'Precio Regular ($)'}
                        onChangeText={setRegularVal}
                        value={regularVal}
                    />
                    <AppInput
                        label={'Precio Promocional ($)'}
                        onChangeText={setPromotionalVal}
                        value={promotionalVal}
                    />
                    <View style={{ width: '54%' }}>
                        <DropDownGrande
                            label={"Tipo de promoción"}
                            options={['DIARIO']}
                            value={tipo}
                            onSelect={(idx, value) => setTipo(value)}
                        />
                    </View>
                    <View style={{ width: '54%' }}>
                        <DropDownGrande
                            label={"Detalle del Abono"}
                            options={['ABONO DIARIO']}
                            value={detail}
                            onSelect={(idx, value) => setDetail(value)}
                        />
                    </View>

                </View>}

                <Space height={30} />
                <Button
                    disabled={!name || !quantity || !interval || !file || !allow}
                    loading={loading}
                    text={"Modificar Actividad"}
                    onPress={() => { actualizarActividad() }}
                />
                <View style={{ marginTop: 40 }}></View>

            </View>
        </ScrollView>
    );
}

export default CreateActivityScreen;
