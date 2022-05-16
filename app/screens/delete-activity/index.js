import React, { useState } from 'react';
import { Image, ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SearchInput, SubmissionActividades, ErrorActividades } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';



function DeleteActivityScreen() {

const profile = useSelector(store => store.user.profile)

const _actividades = useSelector(store => store.user.actividades)
const [actividades, setactividades] = useState(_actividades)

const [visibleModal, setVisibleModal] = useState(false);
const [modalData, setModalData] = useState({});
const { navigate } = useNavigation();


console.log(actividades, 'flag')

    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Listado de actividades"}
                    description={'Seleccione el ícono de la derecha para eliminar una actividad.'}
                />
                
                <View style={{height:20}} />

                {_actividades.length == 0 &&
                
                    <ErrorActividades/>
                    
                }
                {actividades.map(i => <SubmissionActividades data={i} profile={profile} onPress={(data) => {
                   navigate(Screens.Reservas, {data})
                   
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
        </>
    );
}

export default DeleteActivityScreen;