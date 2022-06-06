import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SearchInput, SubmissionItem, TrackModal, Error } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';


function HistoryScreen() {

    const profile = useSelector(store => store.user.profile)
    const _submissions1 = useSelector(store => store.user.submissions1)
    const [submissions1, setSubmissions1] = useState([_submissions1])
    
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        handleSearch();
       
    }, [searchValue, _submissions1])

    function handleSearch() {
        if (searchValue) {
            const filteredData = _submissions1.filter(data => {
                const searchData = data && data.nombre.toUpperCase()
                const textData = searchValue.toUpperCase()
                return searchData.indexOf(textData) > -1
            })
            setSubmissions1(filteredData)
        } else {
            setSubmissions1(_submissions1)
        }
    }


    return (
        <>
        
        <ScrollView style={styles.container}>
            
                <Header
                    title={"Reservas Históricas"}
                    description={'Listado de Actividades'}
                />
                 <SearchInput
                    onChangeText={setSearchValue}
                    value={searchValue}
                />
                <SafeAreaView>
                
                {_submissions1.length == 0 ?
                
               <View style={{marginBottom:20}}>
                <Error /> 
                </View> :
               
              submissions1.map(i => <SubmissionItem data={i} profile={profile} onPress={(data) => {
                setModalData(data);
                setVisibleModal(true);
            }} />) 
                
                }

                <View style={{height:30}} />
                </SafeAreaView>
            </ScrollView>
          
            {visibleModal && <TrackModal onClose={() => { setVisibleModal(false) }} data={modalData} />}
       
        </>
    );
}

export default HistoryScreen;
