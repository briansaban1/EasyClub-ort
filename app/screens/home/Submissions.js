import React, { useState, useEffect } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { SearchInput, SubmissionItem, Error } from '../../components';
import { AppText, FlexBetweenWrapper, Heading2, Space } from '../../components/styled-components';
import { AppStyles, Colors, Images, Screens  } from '../../constants';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Value } from 'react-native-reanimated';



function Submissions({onSelectData}) {
    const {navigate} = useNavigation();
    const profile = useSelector(store => store.user.profile)
    
    const _submissions = useSelector(store => store.user.submissions)
    const [submissions, setSubmissions] = useState(_submissions)

    const [searchValue, setSearchValue] = useState()

    useEffect(() => {
        handleSearch();
    }, [searchValue, _submissions])

    //se realiza la busqueda en la lista segun el nombre de la actividad
    function handleSearch() {
        if (searchValue) {
            const filteredData = _submissions.filter(data => {
                const searchData = data && data.nombre.toUpperCase()
                const textData = searchValue.toUpperCase()
                return searchData.indexOf(textData) > -1
            })
            setSubmissions(filteredData)
        } else {
            setSubmissions(_submissions)
        }
    }
   
    return (
        <View>
            <SearchInput 
             onChangeText={setSearchValue}
             value={searchValue}
            />
            <FlexBetweenWrapper style={{marginTop:-3}} paddingHorizontal={30} marginTop={20}>
                <Heading2  color={Colors.darkblue}>{'Mis Reservas'}</Heading2>
                <TouchableOpacity
                    style={AppStyles.flexWrapper}
                    onPress={() => { navigate(Screens.History) }}
                >
                    <AppText>{'Mostrar Todo'}</AppText>
                    <Image source={Images.ArrowRight} style={{ width: 12, height: 12, marginLeft: 10 }} />
                </TouchableOpacity>
            </FlexBetweenWrapper>

            <View style={{marginTop:10}}></View>


            {_submissions.length == 0 ?
              
                <View style={{marginBottom:20}}>
                <Error /> 
                </View> : 
              submissions.map((i) =>  <SubmissionItem data={i} profile={profile} onPress={onSelectData}/>)

            }
        </View>
    );
}

export default Submissions;
