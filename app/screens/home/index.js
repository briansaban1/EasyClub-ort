import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, RefreshControl, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ImageButton, TrackModal } from '../../components';
import { AppText, FlexBetweenWrapper } from '../../components/styled-components';
import Images from '../../constants/images';
import { safeGetOr } from '../../utils/fp';
import Block from './Block';
import ResumenComponent from './Resumen';
import Submissions from './Submissions';

import styles from './styles';
import Tab from './Tab';
import { getPromociones, getSubmissions } from '../../store/user/action';
import { getSubmissions1 } from '../../store/user/action';
import { getActividades } from '../../store/user/action';

import { getFacturas } from '../../store/user/action';
import { getPuntos } from '../../store/user/action';
import { getWallet } from '../../store/user/action';

import { getDescuento } from '../../store/user/action';

import { getUserMenu } from '../../store/user/action';
import { mytoken } from '../../store/user/action';



import Screens from '../../constants/screens';



function HomeScreen() {
  const dispatch = useDispatch();
  const { toggleDrawer, navigate } = useNavigation();
  const profile = useSelector(store => store.user.profile)
  const resumen = useSelector(store => store.user.resumen)
  
  const [selected, setSelected] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState({});

  


  useEffect(() => {
    dispatch(getSubmissions(profile.id_usuario));
    dispatch(getSubmissions1(profile.id_usuario));
    dispatch(getActividades());
    dispatch(getPromociones());
    dispatch(getFacturas(profile.id_usuario));
    dispatch(getPuntos(profile.id_usuario));
    dispatch(getWallet(profile.tx_correo, profile.username));
    dispatch(getDescuento(profile.id_usuario));
    dispatch(mytoken(profile.id_usuario));


  }, [])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() => setRefreshing(false));

      dispatch(getSubmissions(profile.id_usuario));
      dispatch(getSubmissions1(profile.id_usuario));
      dispatch(getActividades());
      dispatch(getPromociones());
      dispatch(getFacturas(profile.id_usuario));
      dispatch(getDescuento(profile.id_usuario));
      dispatch(getPuntos(profile.id_usuario));
      dispatch(getWallet(profile.id_usuario, profile.username));
      dispatch(getUserMenu(profile.id_usuario));

    }, []);
  

  return (
    <>
      <ScrollView  style={styles.container} 
      refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.topContainer}>
       
        <SafeAreaView />
          <FlexBetweenWrapper paddingHorizontal={20} >
            <ImageButton
              source={Images.Menu}
              imageStyle={styles.headerIcon}
              onPress={() => { toggleDrawer() }}
            />
            <ImageButton
              source={Images.Notification}
              imageStyle={styles.headerIcon}
              onPress={() => { navigate(Screens.Notifications) }}
            />
          </FlexBetweenWrapper>
          <AppText style={styles.hello}>
            {"Hola, "}
            {<AppText style={styles.username}>{safeGetOr("", "tx_nombre")(profile)}</AppText>}
          </AppText>
          <AppText style={styles.welcome_title}>{"Bienvenido a tu cuenta de\nEasyClub"}</AppText>
          <View style={{height:Platform.OS == 'android' ? 5 : 25}}></View>
          <FlexBetweenWrapper paddingHorizontal={40} marginTop={Platform.OS == 'android' ? 25 : 25}>
            <Block label={"Puntos"} value={safeGetOr("", "puntos")(resumen)} />
            <Block label={"Usuario"} value={`#${safeGetOr("", "id_usuario")(profile)}`} />
            <Block label={"Actividades"} value={safeGetOr("", "total")(resumen)} />
          </FlexBetweenWrapper>
          <View style={{marginTop:Platform.OS == 'android' ? -10 : 20}}></View>
          <FlexBetweenWrapper marginTop={Platform.OS == 'android' ? 0 : 20}>
            <Tab active={selected == 0} label={'Actividades'} source={Images.Activity} onPress={() => { setSelected(0) }} left />
            <Tab active={selected == 1} label={'Reservas'} source={Images.Reservation} onPress={() => { setSelected(1) }} right />
          </FlexBetweenWrapper>
          
        </View>
        
        {selected === 0 && <ResumenComponent />}
        {selected === 1 && (
          <SafeAreaView>
          <Submissions
            onSelectData={(data) => {
              setModalData(data);
              setVisibleModal(true);
            }} />
             </SafeAreaView>
        )}
        
        <View style={{height:20}} />
       
      </ScrollView>
      {visibleModal && <TrackModal onClose={() => { setVisibleModal(false) }} data={modalData} />}
    </>
  );
}

export default HomeScreen;
