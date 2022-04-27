import React, { useState, useEffect, useRef } from 'react';
import { Image, ScrollView, View, Text, TouchableOpacity, FlatList, Animated, Easing } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SearchInput, AlertaModal, SubmissionAlerta, Button } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { AppText, FlexWrapper, Loader, Space } from '../../components/styled-components';
import { Colors, Dimensions } from '../../constants';
import { horario } from './horarios'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment, { min } from 'moment';
import 'moment/locale/es'
import WService from '../../service/WebService';


function ReservaScreen(data) {


    const parametro = data.route.params.data.nombre;
    console.log(parametro)

    const profile = useSelector(store => store.user.profile)

    const _actividades = useSelector(store => store.user.actividades)
    const [actividades, setActividades] = useState(_actividades)

    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const [isSelected, setSelected] = useState();

    const [inicio, setInicio] = useState('');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const position = new Animated.ValueXY({ x: 0, y: 0 });
    const [date, setDate] = useState(moment());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    //console.log(date)

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const slide = () => {
        Animated.timing(position, {
            toValue: { x: 0, y: -220 },
            speed: 500,
            easing: Easing.bounce,
            useNativeDriver: true,
        }).start();
    };

    //se recibe por parametro la hora y verifica si es AM o PM
    const datohr = (horadata) => {
        console.log(horadata)
        var hr = ''
        if (horadata >= '12:00') {
            hr = 'PM'
        } else {
            hr = 'AM'
        }
        return hr
    };


    useEffect(() => {
        if (isSelected && date) {
            fadeIn(), slide();
        }
    }), [];

    const addTime = (value, inicio) => {
        setSelected(value);
        setInicio(inicio);
    }


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const hacerReserva = (hora, fecha, deporte) => {

    }
    const wservice = new WService();

    const [horarios, setHorarios] = useState([]);


    //se pasa por parametro a la API el tipo de actividad y devuelta la lista de horas
    useEffect(() => {
        console.log(parametro)
        wservice.getHorarios(parametro)
            .then(response => {

                console.log(response.status, 'flag')

                if (response.status == 1) {

                    console.log(response.data, 'flag2')


                    setHorarios(response.data.map(item => ({

                        hora: item,
                    })));
                    console.log(horarios)

                }


            })
    }, [])

    console.log(moment(date).format('DD-MM-YYYY'))

console.log(modalData, 'aca')

    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Reservas"}
                    description={'Listado de Horarios'}
                />

                <View style={{ height: 20 }} />

                <View style={{ alignItems: 'center', }}>
                    <TouchableOpacity style={styles.buttonCalendar} onPress={showDatePicker}>
                        <Text style={styles.textDate}>{date == "" ? "Seleccioná una fecha" : moment(new Date(date)).locale('es-AR').utc().format('dddd, DD MMM YYYY')}</Text>
                        <Text style={styles.textDate}>{inicio}</Text>

                    </TouchableOpacity>

                    <DateTimePicker
                        isVisible={isDatePickerVisible}
                        mode="date"
                        locale={'es'}
                        format="DD-MM-YYYY"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        minimumDate={moment().toDate()}
                        maximumDate={moment(new Date()).add(5, 'days').toDate()}
                    //defaultValue={moment().toDate()}
                    />

                    <View style={{ height: 20 }} />


                    <View style={{ width: '85%', marginBottom: 10 }}>

                        <AppText style={styles.subtitleHorario}>Horarios disponibles</AppText>
                        <View style={{ flexDirection: 'row', }}>
                            <Image
                                source={require('@assets/punto2.png')}
                                imageStyle={{ width: 10, height: 10, }}
                                style={styles.location}
                            />
                            <AppText style={styles.dia}>{moment(date).format('dddd, DD MMMM YYYY')}</AppText>
                        </View>
                    </View>

                    <View style={{ height: '50%', width: '100%', alignItems: 'center' }}>




                        {horarios.length == 0 &&
                            <Image
                                source={Images.submissionEmpty}
                                style={AppStyles.submissionEmpty}
                            />
                        }
                        {horarios.map(i =>

                            // <FlatList
                            //     showsHorizontalScrollIndicator={false}
                            //     style={styles.FlatList}
                            //     keyExtractor={(i) => i.hora.toString()}
                            //     data={i}
                            //     renderItem={({ i }) => (

                            //         <TouchableOpacity style={styles.timeContainer} onPress={() => addTime(i.inicio)}>

                            //             <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
                            //                 <Text style={i.inicio == isSelected ? styles.selected : styles.textTime}>
                            //                 {i.inicio} - {i.final}
                            //             </Text>

                            //                 <Text style={item.inicio == isSelected ? styles.selected : styles.textTime}> LIBRE</Text>
                            //             </View>
                            //         </TouchableOpacity>
                            //     )} />
                            <TouchableOpacity style={{}} 
                            onPress={() => {
                                addTime(i.hora); 
                                setModalData(i.hora, date, parametro);
                                setVisibleModal(true);
                            }}>
                                <FlexWrapper>
                                    <View style={i.hora == isSelected ? styles.selected : styles.textTime}></View>
                                    <View style={{
                                        alignItems: 'center',
                                        color: Colors.blue300,
                                        //borderColor: '#A8B3C8',
                                        //borderWidth: 1,
                                        width: '90%',
                                        //borderRadius: 5,
                                        height: 65,
                                        borderStyle: 'dotted',
                                        backgroundColor: '#fff'
                                    }}>


                                        <View style={i.hora == isSelected ? styles.selected : {
                                            //color: Colors.blue400,
                                            borderColor: '#A8B3C8',
                                            borderWidth: 1,
                                            width: '100%',
                                            borderRadius: 5,
                                            height: 60,
                                            borderStyle: 'dotted',
                                            //backgroundColor: '#f',
                                            justifyContent: 'center',
                                            backgroundColor: '#fff',
                                            //shadowOffset:'5',
                                            //shadowOpacity: '#f'
                                        }}>

                                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, alignContent: 'space-between', width: '100%' }}>
                                                <View style={{ alignContent: 'space-between', width: '45%' }}>
                                                    <AppText style={styles.subtitle}>{parametro}</AppText></View>
                                                <View style={{ alignContent: 'space-between' }}>
                                                    <AppText style={styles.label}> {moment(date).format('DD/MM/YYYY')} | {i.hora} {datohr(i.hora)} </AppText>
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </FlexWrapper>
                            </TouchableOpacity>

                        )}

                    </View>
                </View>
                <View>

                </View>
                <View style={{ height: 30 }} />
            </ScrollView>
            {visibleModal && <AlertaModal onClose={() => { setVisibleModal(false) }} data={modalData} fecha={date} actividad={parametro} horadata={datohr(modalData)} />}
        </>
    );
}

export default ReservaScreen;