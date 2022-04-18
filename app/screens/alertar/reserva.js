import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SearchInput, AlertaModal, SubmissionAlerta } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { AppText, FlexWrapper, Loader, Space } from '../../components/styled-components';
import { Colors, Dimensions } from '../../constants';




function HistoryScreen(data) {

const profile = useSelector(store => store.user.profile)

const _actividades = useSelector(store => store.user.actividades)
const [actividades, setActividades] = useState(_actividades)

const [visibleModal, setVisibleModal] = useState(false);
const [modalData, setModalData] = useState({});


    const [searchValue, setSearchValue] = useState()

    useEffect(() => {
        handleSearch();
    }, [searchValue])

    function handleSearch() {
        if (searchValue) {
            const filteredData = _actividades.filter(data => {
                const searchData = data && data.color.toUpperCase()
                const textData = searchValue.toUpperCase()
                return searchData.indexOf(textData) > -1
            })
            setActividades(filteredData)
        } else {
            setActividades(_actividades)
        }
    }
    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Reservas"}
                    description={'Listado de Horarios'}
                />
                
                <View style={{height:20}} />


                <SearchInput 
             onChangeText={setSearchValue}
             value={searchValue}
            />


<Text>{}</Text>


                <View style={{ alignItems: 'center',}}>
                    <FlexWrapper>
                        <View style={{
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
                                shadowOpacity: '#0000030'
                            }}>

                                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, alignContent: 'space-between', width: '100%' }}>
                                    <View style={{ alignContent: 'space-between', width: '45%' }}>
                                        <AppText style={styles.subtitle}>TENIS</AppText></View>
                                    <View style={{ alignContent: 'space-between' }}>
                                        <AppText style={styles.label}> 10/04/2022 | 8.30AM</AppText>
                                    </View>
                                </View>

                            </View>






                        </View>
                    </FlexWrapper>
                </View>






                {_actividades.length == 0 &&
                    <Image
                        source={Images.submissionEmpty}
                        style={AppStyles.submissionEmpty}
                    />
                }
                {actividades.map(i => <SubmissionAlerta data={i} profile={profile} onPress={(data) => {
                    setModalData(data);
                    setVisibleModal(true);
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
            {visibleModal && <AlertaModal onClose={() => { setVisibleModal(false) }} data={modalData} />}
        </>
    );
}

export default HistoryScreen;