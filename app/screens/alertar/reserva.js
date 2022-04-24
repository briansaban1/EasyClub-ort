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
    const [date, setDate] = useState('');
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

    const confirm =() =>{
       
    }
    const wservice = new WService();

    const [horarios, setHorarios] = useState([]);
    const [inicioHora, setInicioHora] = useState();
    const [finHora, setFinHora] = useState();
    const [intHora, setIntHora] = useState();


    useEffect(() => {
        console.log(parametro)
        wservice.getHorarios(parametro)
            .then(response => {
                console.log(response.status)

                if (response.status == 1) {
                    console.log(response.data)
                    

                    const datos = response.data
                    
                    setHorarios(datos.map(item => ({
                        inicio: item.inicio,
                        fin: item.fin,
                        intervalo: item.intervalo,
                    })));  

                    setInicioHora(horarios[horarios.length-1].inicio);
                    setFinHora(horarios[horarios.length-1].fin);
                    setIntHora(horarios[horarios.length-1].intervalo);
                    
                }
                
                
            })
    }, [])
   

    function intervaloHora(inicioHora, finHora, intHora) {


        //se reciben por parametro la hora de inicio, fin e intervalo.

        //hay que convertir las horas recibidas en string a tipo TIME

        //Generar un FOR para listar todos los horarios disponibles

        //Nos quedamos ACA !

        console.log(inicioHora, finHora, intHora)
        const date = new Date();
        
        const dt = date.getMinutes(inicioHora)

        console.log(inicioHora) 

        const dt1 = date.getMinutes(finHora)
        console.log(dt, dt1)

        const ranges = [];
        const format = {
            hour: 'numeric',
            minute: 'numeric',
        };

        
        for (let minutes = inicioHora; minutes < 8 * 60; minutes = minutes + intervalos) {
            console.log(minutes)
            date.setHours(0);
            date.setMinutes(minutes);
            ranges.push(date.toLocaleTimeString(format));
        }
        console.log(ranges)
        return ranges;



    }

console.log(intervaloHora(inicioHora, finHora, intHora) )

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
                    <View style={{height:'50%',width:'100%', alignItems:'center' }}>

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
                    //     keyExtractor={(i) => i.inicio.toString()}
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
                    <Text>{i.inicio} {i.fin} {i.intervalo}</Text>
                    

                        )}
                        
                        </View>
         <Button
                disabled={!date || !isSelected}
                text={"Confirmar"}
                onPress={confirm}
            />







                    <FlexWrapper>
                        {/* <View style={{
                            alignItems: 'center',
                            color: Colors.blue400,
                            //borderColor: '#A8B3C8',
                            //borderWidth: 1,
                            width: '90%',
                            //borderRadius: 5,
                            height: 95,
                            borderStyle: 'dotted',
                            backgroundColor: '#fff'
                        }}>

                            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf:'flex-start' }}>

                                <View style={{
                                    color: Colors.blue400,
                                    borderColor: Colors.blue400,
                                    borderWidth: 1,
                                    width: '3%',
                                    borderRadius: 25,
                                    height: '60%',
                                    borderStyle: 'dotted',
                                    backgroundColor: Colors.blue400
                                }}></View>
                                <AppText style={styles.label}> Domingo, 10 de Abril de 2022</AppText>
                            </View>

                            <Space />
                            <View style={{
                                //color: Colors.blue400,
                                borderColor: '#A8B3C8',
                                borderWidth: 1,
                                width: '95%',
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
                                        <AppText style={styles.subtitle}>TENIS</AppText></View>
                                    <View style={{ alignContent: 'space-between' }}>
                                        <AppText style={styles.label}> 10/04/2022 | 8.30AM</AppText>
                                    </View>
                                </View>

                            </View>






                        </View> */}
                    </FlexWrapper>
                </View>


                <View style={{ height: 30 }} />
            </ScrollView>
        </>
    );
}

export default ReservaScreen;