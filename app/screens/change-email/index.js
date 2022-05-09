import React from 'react';
import { ScrollView, StatusBar, Modal, Text } from 'react-native';
import { Header, Button, AppInput } from '../../components';
import { Colors, Dimensions } from '../../constants';

import styles from './styles';
import { AppText, CenterText, Space } from '../../components/styled-components';
import { View } from 'react-native';
import { useState } from 'react';
import WService from '../../service/WebService';
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const wservice = new WService();


function ChangeEmailScreen() {
    const [email, setEmail]=useState('')
    const [newEmail, setNewEmail]=useState('')
    const [confnewEmail, setConfNewEmail]=useState('')
    const [loading, setLoading] = useState('')

   

    function sendmail() {
        setLoading(true)
        let message1 = "<h3>Email Actual: " + email + "</h3><h3>Nuevo Email: " + newEmail + "</h3><h3>Confirmación Mail: " + confnewEmail + "</h3>"

        if (email == "" && newEmail == "" && confnewEmail == "") {
            Alert.alert(
                '¡Atención!',
                'Por favor completá todos los campos',
                [
                    { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
                ]
            );
            setLoading(false)
        } else {
            wservice.sendChangeEmail({
                email: email,
                asunto: "Cambio email: " + email,
                message: message1,
                
                
            }).then(res => {
                setLoading(true)
                setEmail('');
                setNewEmail('');
                setConfNewEmail('');
               
            }).catch(e => {
                Alert.alert(
                    '¡Atención!',
                    'Por favor aguardá un momento a que procesemos la información',
                    [
                        { text: 'OK', onPress: () => console.warn('NO Pressed'), style: 'ok' }
                    ]
                );
                setLoading(false);
               
                
            })
        }
    }

    const allow =  newEmail == confnewEmail;



    return (
        <View style={styles.container}>
            <Header
                title={"Email"}
                description={"Modificá tus datos de contacto"}
            />
            <Space />
            <Space />
            <AppInput
                label={'Email actual'}
                onChangeText={setEmail}
                value={email}
               
            />
            <AppInput
                label={'Nuevo Email'}
                onChangeText={setNewEmail}
                value={newEmail}
            />
            <AppInput
                label={'Confirmá tu nuevo Email'}
                onChangeText={setConfNewEmail}
                value={confnewEmail}
            />
             <Space height={30} />
            <Button
                disabled={!email||!newEmail||!confnewEmail||!allow}
                text={"Aceptar"}
                onPress={sendmail}
            />

<Modal
                    animationType="slide"
                    transparent={true}
                    style={styles.modal}
                    visible={loading}
                    >
                    <StatusBar backgroundColor="#00000040"  barStyle="light-content"/>

                    <View style={styles.modal}>
                        <View style={styles.modalContainer}>
                            <AppText style={styles.title1}>¡Datos recibidos!</AppText>
                            <View style={styles.hr} />

                          <Text style={{color: Colors.blue400, fontSize: Dimensions.px15, marginTop:12, 
                                width: '85%', alignItems: 'center', textAlign: 'center',
                                justifyContent: 'center',}}>
                                     En un lapso de 24hs vamos a estar validando la información.
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
                                onPress={() => setLoading(false) }
                                >

                                <AppText style={styles.text1}>Aceptar</AppText>
                            </TouchableOpacity>

                           


                        </View>
                    </View>
                </Modal>

        </View>
    );
}

export default ChangeEmailScreen;
