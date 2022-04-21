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
import moment from 'moment';
import 'moment/locale/es' 


function ReservaScreen(data) {

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

    console.log(date)

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
                    />

                    <View style={{ height: 20 }} />
                    <View style={{height:'50%',width:'100%', alignItems:'center' }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={styles.FlatList}
                        keyExtractor={(item) => item.id.toString()}
                        data={horario}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.timeContainer} onPress={() => addTime(item.id)}>
                                
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
                                    <Text style={item.id == isSelected ? styles.selected : styles.textTime}>
                                    {item.inicio} - {item.final}
                                </Text>
                                
                                    <Text style={item.id == isSelected ? styles.selected : styles.textTime}> LIBRE</Text>
                                </View>
                            </TouchableOpacity>
                        )} />
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