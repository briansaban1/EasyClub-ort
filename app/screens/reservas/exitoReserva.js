import React, { useState, useEffect } from 'react';
import { Linking, View, ScrollView, Image, Text, ImageBackground, TouchableOpacity, Alert, SafeAreaView, Touchable } from 'react-native';
import { Header, ImageButton, Button } from '../../components';
import { Divider, FlexWrapper, AppText, Space } from '../../components/styled-components';
import styles from './styles';
import { Title } from '../../components/Header';
import Screens from '../../constants/screens';
import { useSelector, useDispatch } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import { Colors, Dimensions, Images, AppStyles } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import { reset } from '../../navigation/RootNavigation';

import LottieView from 'lottie-react-native';



function ExitoScreen() {
    const _profile = useSelector(store => store.user.profile);
    const [profile, setProfile] = useState(_profile);


    const [loading, setLoading] = useState(false);
    const resumen = useSelector(store => store.user.resumen)
    const { navigate } = useNavigation();

    


    useEffect(() => {
      
      }, [])

    
    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>
            <View >
                <Header
                    title={"Reserva Confirmada"}
                    description={"Confirmación"}
                />

                <View height={30} />


                <View style={styles.fondo_new}>
                    <View style={{ flexDirection: 'row', justifyContent:'center', }}>
                        <AppText style={styles.title_corto}>{"¡La reserva ha sido confirmada exitosamente!"}</AppText>
                        
                    </View>
                    <View style={{ marginTop: 20, alignItems: 'center', marginBottom:20 }}>
                        
                    <LottieView source={require('@assets/check.json')}
                    autoPlay={true}
                    loop={false}
                    resizeMode="cover" 
                    style={{ width: 150, height: 160, marginVertical: 5, alignSelf: 'center' }}
                />
                        

                    </View>
                    <Button
                        text={"Aceptar"}
                        //buttonStyle={{width:'47%'}}
                        onPress={() => {
                            {
                            reset('MainApp')
                           }
                        }}
                    />

                </View>
            </View>

        </ScrollView>
    );
}

export default ExitoScreen;
