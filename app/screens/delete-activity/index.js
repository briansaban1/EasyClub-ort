import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, RefreshControl } from 'react-native';
import { Header, SearchInput, SubmissionActividades, ErrorActividades } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';
import { useSelector, useDispatch } from 'react-redux';
import { getActividades } from '../../store/user/action';



function DeleteActivityScreen() {

const profile = useSelector(store => store.user.profile)

const _actividades = useSelector(store => store.user.actividades)
const [actividades, setactividades] = useState(_actividades)

const [visibleModal, setVisibleModal] = useState(false);
const [modalData, setModalData] = useState({});
const { navigate } = useNavigation();
const dispatch = useDispatch();


useEffect(() => {
    dispatch(getActividades());
  }, [])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() => setRefreshing(false));

      dispatch(getActividades());
    

    }, []);



console.log(actividades, 'flag')

    return (
        <>
     <ScrollView  style={styles.container} 
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
                <Header
                    title={"Eliminar actividad"}
                    description={'Seleccioná el ícono de la derecha para borrar una actividad.'}
                />
                
                <View style={{height:20}} />

                {_actividades.length == 0 &&
                
                    <ErrorActividades/>
                    
                }
                {actividades.map(i => <SubmissionActividades data={i} profile={profile} onPress={(data) => {
                  {data}
                   
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
        </>
    );
}

export default DeleteActivityScreen;