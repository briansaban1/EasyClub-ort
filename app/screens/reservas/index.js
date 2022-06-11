import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SubmissionReserva, SearchInput } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';



function ReservasScreen() {

const profile = useSelector(store => store.user.profile)

const _actividades = useSelector(store => store.user.actividades)
const [actividades, setActividades] = useState(_actividades)

const [visibleModal, setVisibleModal] = useState(false);
const [modalData, setModalData] = useState({});
const { navigate } = useNavigation();
const [searchValue, setSearchValue] = useState('')

useEffect(() => {
    handleSearch();
}, [searchValue])

//se realiza una busqueda por el nombre de la actividad
function handleSearch() {
    if (searchValue) {
        const filteredData = _actividades.filter(data => {
            const searchData = data && data.nombre.toUpperCase()
            const textData = searchValue.toUpperCase()
            return searchData.indexOf(textData) > -1
        })
        setActividades(filteredData)
    } else {
        setActividades(_actividades)
    }
}


console.log(actividades, _actividades)

    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Reservar Actividades"}
                    description={'Listado de actividades'}
                />
        <SearchInput 
             onChangeText={setSearchValue}
             value={searchValue}
            />
                
                <View style={{height:5}} />

                {_actividades.length == 0 &&
                    <Image
                        source={Images.submissionEmpty}
                        style={AppStyles.submissionEmpty}
                    />
                }
                {actividades.map(i => <SubmissionReserva data={i} profile={profile} onPress={(data) => {
                   navigate(Screens.GenerarReserva, {data})
                   
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
        </>
    );
}

export default ReservasScreen;