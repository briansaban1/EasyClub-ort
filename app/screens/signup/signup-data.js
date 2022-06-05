import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppInput, Header, ImageButton, Button } from '../../components';
import { updateRegisterProfile } from '../../store/user/action';
import styles from './styles';
import Images from '../../constants/images';
import { useNavigation } from '@react-navigation/native';
import Screens from '../../constants/screens';
import { onChange } from 'react-native-reanimated';

function UserDataScreen() {
  const dispatch = useDispatch();
  const { navigate } = useNavigation()
  const profile = useSelector(store => store.user.registerProfile);
  const [loading, setLoading] = useState(false);

  function updateProfile(prop) {
    console.log(prop)

    dispatch(updateRegisterProfile({ ...profile, ...prop }))
  }

  const { nombre, apellido, telefono, whatsapp } = profile;
  const allow = nombre && apellido && telefono
  return (
    <ScrollView style={styles.container}>

      <View>
        <SafeAreaView />
        <Header title={"Tus Datos"} description={'Creá tu cuenta ahora.'} />
        <AppInput
          label={'Nombre'}
          onChangeText={(text) => updateProfile({ nombre: text })}
          value={nombre}
          containerStyle={{ marginTop: 40 }}
        />
        <AppInput
          label={'Apellido'}
          onChangeText={(text) => updateProfile({ apellido: text })}
          value={apellido}
        />
        <AppInput
          label={'Teléfono'}
          onChangeText={(text) => updateProfile({ telefono: text.trim().replace(/[^0-9]/g, '') })}
          value={telefono}
          keyboardType="numeric"
        />
        <AppInput
          label={'WhatsApp (opcional)'}
          keyboardType="numeric"
          onChangeText={(text) => 
            updateProfile({ whatsapp: text.trim().replace(/[^0-9]/g, '')})
            
        }
          value={whatsapp}
          
        />

        <Button
          disabled={!allow}
          loading={loading}
          text={'Continuar'}
          onPress={() => { navigate(Screens.SignupDelivery) }}
        />
        <View style={{ height: 35 }}></View>

      </View>
    </ScrollView>

  );
}

export default UserDataScreen;
