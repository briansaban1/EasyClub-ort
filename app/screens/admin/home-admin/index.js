import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, SafeAreaView, RefreshControl, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ImageButton, TrackModal } from '../../../components';
import { AppText, FlexBetweenWrapper } from '../../../components/styled-components';
import Images from '../../../constants/images';
import { safeGetOr } from '../../../utils/fp';
import Block from './Block';
import ResumenComponent from './Resumen';
import Reportes from './Reportes';

import styles from './styles';
import Tab from './Tab';
import { 
        getPromociones,
        getActividades,
        getSocios,
        getUsuarios,
        getAdminMenu, 
        mytoken
      } from '../../../store/user/action';


function HomeScreen() {
  const dispatch = useDispatch();
  const { toggleDrawer } = useNavigation();
  const profile = useSelector(store => store.user.profile)
  const actividades = useSelector(store => store.user.actividades)
  const socios = useSelector(store => store.user.socios)
  const promociones = useSelector(store => store.user.promociones)
  const usuarios = useSelector(store => store.user.usuarios)
  
  const [selected, setSelected] = useState(0);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState({});

  


  useEffect(() => {
    dispatch(getActividades());
    dispatch(getSocios());
    dispatch(getPromociones());
    dispatch(getUsuarios());
    dispatch(mytoken(profile.id_usuario));


  }, [])

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  
    const [refreshing, setRefreshing] = React.useState(false);
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      wait(1000).then(() => setRefreshing(false));

      dispatch(getActividades());
      dispatch(getPromociones());
      dispatch(getSocios());
      dispatch(getUsuarios());
      dispatch(getAdminMenu());

    }, []);
    
  return (
    <>
      <ScrollView  style={styles.container} 
      // refreshControl={
      //     <RefreshControl
      //       refreshing={refreshing}
      //       onRefresh={onRefresh}
      //     />
      //   }
      >
        <View style={styles.topContainer}>
       
        <SafeAreaView />
          <FlexBetweenWrapper paddingHorizontal={20} >
            <ImageButton
              source={Images.Menu}
              imageStyle={styles.headerIcon}
              onPress={() => { toggleDrawer() }}
            />
          </FlexBetweenWrapper>
          <AppText style={styles.hello}>
            {"Hola, "}
            {<AppText style={styles.username}>{safeGetOr("", "tx_nombre")(profile)}</AppText>}
          </AppText>
          <AppText style={styles.welcome_title}>{"Bienvenido a tu cuenta de\nEasyClub"}</AppText>
          <View style={{height:Platform.OS == 'android' ? 5 : 25}}></View>
          <FlexBetweenWrapper paddingHorizontal={40} marginTop={Platform.OS == 'android' ? 25 : 25}>
            <Block label={"Promociones"} value={promociones.length} />
            <Block label={"Usuarios"} value={usuarios.length} />
            <Block label={"Actividades"} value={actividades.length} />
          </FlexBetweenWrapper>
          <View style={{marginTop:Platform.OS == 'android' ? -10 : 20}}></View>
          <FlexBetweenWrapper marginTop={Platform.OS == 'android' ? 0 : 20}>
            <Tab active={selected == 0} label={'Estadísticas'} source={Images.Analytics} onPress={() => { setSelected(0) }} left />
            <Tab active={selected == 1} label={'Reportes'} source={Images.Reports} onPress={() => { setSelected(1) }} right />
          </FlexBetweenWrapper>
          
        </View>
        
        {selected === 0 && <ResumenComponent />}
        {selected === 1 && (
          <SafeAreaView>
          <Reportes
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
