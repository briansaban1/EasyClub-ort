import React, { useState, useEffect, useRef } from 'react';
import { Image, ScrollView, View, Text, TouchableOpacity, FlatList, Animated, Easing } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Header, SearchInput, ReservaModal, Button } from '../../components';
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


function ReservaHoraFechaScreen(data) {

    const dispatch = useDispatch();

    const idActividad = data.route.params.data.id;
    const modalidades = data.route.params.data.modalidad;
    const nombre = data.route.params.data.nombre;
    const cantidadporHora = data.route.params.data.cantidad;
    const img = data.route.params.data.imagen;
    const arancel = data.route.params.data.arancelado;
    const detalle = data.route.params.data.detalle;

    const precioRegular = data.route.params.data.valorRegular;
    const precioPromocional = data.route.params.data.valorPromocional;

console.log(precioPromocional, precioRegular, 'valores')

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


    function valor(precioPromocional, precioRegular ){
        console.log(precioPromocional, precioRegular, 'valoresss')
        if(precioRegular > precioPromocional && !precioPromocional ==""){
            precio = precioPromocional
            
        }else{
            precio = precioRegular
        };
         return precio;
    };



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
                setNoHayMas(response.data.pop())
                //console.log(horarios)
            }
        })
    }, [idActividad])

    const [noHayMas , setNoHayMas] = useState('')

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
                console.log(response.data, 'aca')
                //console.log(disponibilidad, 'flag disp')
            }
        })
    }, [idActividad, dia])



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


const noHayMasDisponible = () =>{
var noHayy = false
if((noHayMas < horaActual) && (moment(date).format('YYYY-MM-DD') == diaActual)){
    noHayy = true
}else{
    noHayy = false
};
return noHayy

};


const horaActual = moment().utcOffset('-03:00').format('HH:MM');
const diaActual = moment().utcOffset('-03:00').format('YYYY-MM-DD');

//se recibe por parametro la hora por cada intervalo y se compara con el dia y fecha actual.
//Para listar solamente los horarios disponibles a partir de la hora actual.
const consultaHora = (hora, dia) => {
    var consulta = true
    if (hora <= horaActual && dia == diaActual){
        consulta = false
        console.log(consulta, hora, horaActual, dia, diaActual)
      }else{
        consulta = true
        console.log(consulta, hora, horaActual, dia, diaActual)
      };
      return consulta
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
                        <Text style={styles.textDate}>{date == "" ? "Seleccioná una fecha" : moment(new Date(date)).utcOffset('-03:00').format('dddd, DD MMM YYYY')}</Text>
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

                        
                        {!loading && horarios.map(i =>
                            <TouchableOpacity 
                                style={{}}
                                disabled={(dispo(i.hora, cantidadporHora, idActividad, moment(date).format('YYYY-MM-DD')) <= 0) ? true : false}
                                //key={{i}}
                                onPress={() => {
                                    addTime(i.hora);
                                    setModalData(i.hora, date, idActividad, nombre);
                                    setVisibleModal(true);
                                }}>
                                <FlexWrapper>
                                    <View style={i.hora == isSelected ? styles.selected : styles.textTime}></View>
                                    
                                    {(consultaHora(i.hora, moment(date).format('YYYY-MM-DD'))) && <View style={
                                    (dispo(i.hora, cantidadporHora, idActividad, moment(date).format('YYYY-MM-DD')) > 0) 
                                     ? styles.noOculto : styles.oculto }>


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

                                    </View>}
                                </FlexWrapper>
                            </TouchableOpacity>
                            
                            )}

                       {horarios.length == 0 || noHayMasDisponible() &&
                            <View>
                            <Image
                                source={Images.submissionEmpty}
                                style={AppStyles.submissionEmpty}
                            />
                            <AppText style={{alignItems: 'center', justifyContent: 'center', textAlign:'center', fontSize: 16, fontWeight: '500', width:'60%', marginTop:10}}>
                               {'No hay actividades disponibles para el día\n de hoy'}
                            </AppText>
                            </View>
                        }



                        {loading && <Loader color={Colors.darkblue} style={{ flex: 1 }} />}
                    </View>
                </View>
                <View>

                </View>
                <View style={{ height: 30 }} />
            </ScrollView>
            {visibleModal && <ReservaModal onClose={() => {{ setVisibleModal(false); setSelected(false); }}} data={modalData} fecha={date} nombre={nombre} idActividad={idActividad} horadata={datohr(modalData)} imagen={img} modalidad={modalidades} arancel={arancel} precio={valor(precioPromocional, precioRegular)} detalle={detalle} />}

        </>
    );
}

export default ReservaHoraFechaScreen;