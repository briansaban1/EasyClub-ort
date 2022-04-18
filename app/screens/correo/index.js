import React, { useState, useEffect } from 'react';
import { Alert, Image, ScrollView, View, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Header, SearchInput, Error } from '../../components';
import EnviosItem from '../../components/EnviosItem';
import CorreosModal from '../../components/CorreosModal';

import { AppStyles, Images } from '../../constants';
import { getCorreos } from '../../store/user/action';
import styles from './styles';


function CorreosScreen() {

    const profile = useSelector(store => store.user.profile);
    const _correos = useSelector(store => store.user.correos);

    const [correos, setCorreos] = useState(_correos);
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});

    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        handleSearch();
    }, [searchValue])

    function handleSearch() {
        if (searchValue) {
            const filteredData = _correos.filter(data => {
                const searchData = data && data.seguimiento.toUpperCase()
                const textData = searchValue.toUpperCase()
                return searchData.indexOf(textData) > -1
            })
            setCorreos(filteredData)
        } else {
            setCorreos(_correos)
        }
    }



    return (
        <>
        <ScrollView style={styles.container}>
            
                <Header
                    title={"Envíos al Interior"}
                    description={'Envíos por correo al interior del país'}
                />
                <SearchInput
                    onChangeText={setSearchValue}
                    value={searchValue}
                />
                {_correos.length == 0 &&
            <View style={{marginBottom:20}}>
                <Error /> 
                </View>
                }
                {correos.map(i => <EnviosItem data={i} profile={profile} onPress={(data) => {
                    setModalData(data);
                    setVisibleModal(true);
                }} />)}
                <View style={{ height: 30 }} />
                
            </ScrollView>
            {visibleModal && <CorreosModal onClose={() => { setVisibleModal(false) }} data={modalData} />}
        </>
    );
}

export default CorreosScreen;
