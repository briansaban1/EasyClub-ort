import React, { useState, useEffect, useRef } from 'react';
import { Image, ScrollView, View, Text, TouchableOpacity, FlatList, Animated, Easing } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
import { getHorarios } from '../../store/user/action';


function ReservaScreen(data) {

    const dispatch = useDispatch();

    const idActividad = data.route.params.data.id;
    const modalidades = data.route.params.data.modalidad;
    const nombre = data.route.params.data.nombre;
    const cantidadporHora = data.route.params.data.cantidad;
    const img = data.route.params.data.imagen;


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
        };

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
        dispo(date, cantidadporHora);
    };

    const wservice = new WService();

    const [horarios, setHorarios] = useState([]);
    const dia = moment(date).format('YYYY-MM-DD')
    const [disponibilidad, setDisponibilidad] = useState([]);

    const [loading, setLoading] = useState(true);


    //console.log(dia, 'dia')

    //se pasa por parametro a la API el tipo de actividad y devuelta la lista de horas
    useEffect(() => {
        wservice.getHorarios(idActividad, dia).then(response => {
            //console.log(idActividad, dia, response.data, 'flag')

            if (response.status == 1) {

                //console.log(response.data, 'flag2')
                setLoading(false)
                setHorarios(response.data.map(item => ({

                    hora: item,
                })));

                //console.log(horarios)
            }
        })
    }, [idActividad])


    useEffect(() => {
        wservice.getDisponibilidad(idActividad, dia).then(response => {

            //console.log(idActividad, dia, response, 'flag')

            if (response.status == 1) {

                console.log(response.data, 'aca')

                setDisponibilidad(response.data.map(item => ({
                    disponible: item.noDisponible,
                    horaOcupada: item.horaReserva,
                    id_act: item.id_actividad,
                    fechaReserva: item.fechaReserva
                })));

                //console.log(disponibilidad, 'flag disp')
            }
        })
    }, [idActividad])

    const horaActual = moment().utcOffset('-03:00').format('hh:mm');



    //se verifica la disponibilidad que hay por dia por hora segun la actividad
    const dispo = (horadata, cantidadporHora, idActividad, dia) => {
        var cant = cantidadporHora;
        for (var i = 0; i < disponibilidad.length; i++) {
            if (horadata == disponibilidad[i].horaOcupada && idActividad == disponibilidad[i].id_act && dia == disponibilidad[i].fechaReserva) {

                cant = cant - (disponibilidad[i].disponible)
                if (cant <= 0) {
                    cant = '0'
                } else {
                };
            } else {
                cant;
            };
        };
        return cant
    };


    //console.log(moment(date).format('DD-MM-YYYY'))

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
                        {!loading && horarios.map(i =>
                            <TouchableOpacity 
                                style={{}}
                                disabled={(dispo(i.hora, cantidadporHora, idActividad, moment(date).format('YYYY-MM-DD')) <= 0) ? true : false || (i.hora >= horaActual) ? true : false}
                                onPress={() => {
                                    addTime(i.hora);
                                    setModalData(i.hora, date, idActividad, nombre);
                                    setVisibleModal(true);
                                }}>
                                <FlexWrapper>
                                    <View style={i.hora == isSelected ? styles.selected : styles.textTime}></View>
                                    <View style={(dispo(i.hora, cantidadporHora, idActividad, moment(date).format('YYYY-MM-DD')) > 0) ? styles.noOculto : styles.oculto || (i.hora >= horaActual) ? styles.noOculto : styles.oculto}>


                                        <View style={i.hora == isSelected ? styles.selected : styles.noSelected}>

                                            <View style={styles.orden}>
                                                <View style={{ alignContent: 'space-between', width: '45%' }}>
                                                    <AppText style={styles.subtitle}>{nombre}</AppText>
                                                    <AppText style={styles.label}>Lugares: {dispo(i.hora, cantidadporHora, idActividad, moment(date).format('YYYY-MM-DD'))}</AppText>
                                                </View>
                                                <View style={{ alignContent: 'space-between' }}>
                                                    <AppText style={styles.label}> {moment(date).format('DD/MM/YYYY')} | {i.hora} {datohr(i.hora)} </AppText>
                                                </View>
                                            </View>

                                        </View>

                                    </View>
                                </FlexWrapper>
                            </TouchableOpacity>

                        )}
                        {loading && <Loader color={Colors.darkblue} style={{ flex: 1 }} />}
                    </View>
                </View>
                <View>

                </View>
                <View style={{ height: 30 }} />
            </ScrollView>
            {visibleModal && <AlertaModal onClose={() => {{ setVisibleModal(false); setSelected(false); }}} data={modalData} fecha={date} nombre={nombre} idActividad={idActividad} horadata={datohr(modalData)} imagen={img} modalidad={modalidades} />}
        </>
    );
}

export default ReservaScreen;