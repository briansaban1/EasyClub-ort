import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View, LayoutAnimation, Text, Modal, StatusBar, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getPromociones } from '../../../store/user/action';
import { Header, ErrorPromociones } from '../../../components';
import { Colors, Dimensions } from '../../../constants';
import { AppText, FlexWrapper } from '../../../components/styled-components';
import WService from '../../../service/WebService';
import styled from 'styled-components';
import LottieView from 'lottie-react-native';
import styles from './styles';
import ImageButton from '../../../components/ImageButton';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../../constants/screens';


const BoldText = styled(AppText)`
  font-weight:bold;
  color:${Colors.darkblue};
  margin-vertical:3px;
`

function PromocionesScreen() {
const dispatch = useDispatch();
useEffect(() => {
dispatch(getPromociones())
}, [dispatch, _promociones])
const profile = useSelector(store => store.user.profile)

const _promociones = useSelector(store => store.user.promociones)
const [promociones, setPromociones] = useState(_promociones)
const [modalVisible, setModalVisible] = useState(false);
const [admin, setAdmin] = useState(true);

useEffect(() => {
    setPromociones(_promociones)
})

const wservice = new WService();

const { navigate } = useNavigation();

    function eliminarPromocion(ids) {
        console.log(ids)
        wservice.deletePromocion({
            id: ids
        }).then(res => {  
          if (res.status == 1){
            setModalVisible(true);
            dispatch(getPromociones());
            console.log("devuelve status uno uno asffas")
        }
        }).catch(e => {
            Alert.alert(
                '¡Atención!',
                'Por favor aguardá un momento a que procesemos la información',
                [
                    { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
                ]
            );
            setModalVisible(false);
        })
    };


console.log(promociones, 'IJOASFBNIAUSFJN FLAGH GLAH PROMOCIONES ---------------------------------------------------', "color: #bada55")
    return (
        <>
            <ScrollView style={styles.containerGeneral}>
                <Header
                    title={"Promociones"}
                    description={'Listado de ofertas'}
                />
                
                <View style={{height:20}} />

                {_promociones.length == 0 &&
                
                    <ErrorPromociones/>
                    
                }
                {promociones.map(i => 
                   <View style={styles.container}>
                   <Image
                       source={{
                           uri: i.imagen,
                         }}
                       imageStyle={{ resizeMode: 'stretch' }}
                       style={styles.location}
                   />
                   <View style={styles.mainContainer} >
                   <BoldText>PROMOCIÓN {i.id}</BoldText>
                       <BoldText>{i.nombre} - {i.detalle}</BoldText>
                       <AppText>Valor Regular: ${i.valorRegular}</AppText>
                       <Text style={{fontWeight:'bold', fontSize: Dimensions.multiplier * 14, color:'green', letterSpacing:0.135, marginTop:3 }}>Valor Promocional: ${i.valorPromocional}</Text>
                   </View>
                   {!admin && 
                   <ImageButton
                       source={require('@assets/ios-arrow-right.png')}
                       imageStyle={{width: 22, height: 22, resizeMode: 'contain'}}
                       onPress={()=>{onPress&&onPress(i)}}
                   />}
                   {admin &&
                   <>
                       <ImageButton
                           style={styles.iconModify}
                           source={require('@assets/edit.png')}
                           imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                           onPress={() => { navigate(Screens.ModifyActivity, {data: i}) }}
                       />
       
                       <ImageButton
                           style={styles.iconDelete}
                           source={require('@assets/eliminarAct.png')}
                           imageStyle={{ width: 21, height: 21, resizeMode: 'contain' }}
                           onPress={() => { eliminarPromocion(i.id);}}
                       />
                   </>
                   }
                   <Modal
                       animationType="slide"
                       transparent={true}
                       style={styles.modal}
                       visible={modalVisible}
                   >
                           <StatusBar backgroundColor="#00000040" barStyle="light-content" />
       
                           <View style={styles.modal}>
                               <View style={styles.modalContainer}>
                                   <AppText style={styles.title1}>¡Promocion Eliminada!</AppText>
                                   <View style={styles.hr} />
       
                                   <Text style={{
                                       color: Colors.blue400, fontSize: Dimensions.px15, marginTop: 12,
                                       width: '85%', alignItems: 'center', textAlign: 'center',
                                       justifyContent: 'center',
                                   }}>
       
                                   </Text>
                                   <View style={styles.flexContainer1}>
                                       <LottieView source={require('@assets/check.json')}
                                           autoPlay={true}
                                           loop={false}
                                           resizeMode="cover"
                                           style={{ width: 110, height: 110, marginVertical: 5, alignSelf: 'center' }}
                                       />
                                   </View>
                                   <TouchableOpacity style={styles.button1}
                                       onPress={() => { setModalVisible(false) }}
                                   >
       
                                       <AppText style={styles.text1}>Aceptar</AppText>
                                   </TouchableOpacity>
                               </View>
                           </View>
                   </Modal>
               </View> 
                    )}
                <View style={{height:30}} />
            </ScrollView>
        </>
    );
}

export default PromocionesScreen;