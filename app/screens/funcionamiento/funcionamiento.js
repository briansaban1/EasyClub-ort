import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Header } from '../../components';
import { Title } from '../../components/Header';
import { AppText } from '../../components/styled-components';

import { Divider, Space } from '../../components/styled-components';
import Item from '../contact/Item';
import styles from './styles';
import Screens from '../../constants/screens';
import { Colors, Dimensions } from '../../constants';
import { openTermsOfService } from '../../utils';



function FuncionamientoServicioScreen() {

    return (
      <ScrollView style={styles.container}>

        <View >
            <Header
                title={"Detalles del Servicio"}
            />

<View style={styles.mainContainer}>


   
<View style={{ width: "100%", marginTop: 2, alignContent:"center", alignItems:"center", }}>
      <View style={styles.sub_bg}>
      
        <Text style={styles.text16}>¿Cómo funciona el sistema?</Text>
        <Text style={styles.text15}>
                  ¡Es muy simple! Solamente debés dirigirte a la sección reservas y seleccionar la actividad que desees realizar en el día y hora de tu preferencia.
                  
                  </Text>
      </View>
      </View>


      <View style={{ width: "100%", marginTop: 10, alignContent:"center", alignItems:"center", }}>
      <View style={styles.sub_bg}>
      
        <Text style={styles.text16}>¿Qué actividades se pueden reservar?</Text>
        <Text style={styles.text15}>
       En EasyClub contamos con canchas de tenis, paddle y fútbol. 
       Además, contamos con bicicletes para spinning, un gimnasio con las últimas máquinas y una piscina climatizada para que puedas disfrutar de la actividad todo el año.
        </Text>
      
      </View>
      </View>
      
      <View style={{ width: "100%", marginTop: 10, alignContent:"center", alignItems:"center", }}>
      <View style={styles.sub_bg}>
      
        <Text style={styles.text16}>¿Cuales son los costos?</Text>
        <Text style={styles.text15}>
        Los valores del servicio varian según el tipo de actividad que desees realizar.
        Generalmente, muchas actividades tienen fabulosos descuentos promocionales para que puedas aprovechar al máximo tu estadía en el centro deportivo.
                  </Text>
      </View>
      </View>
      

              
            <View style={{marginBottom:25}}></View>
        
    </View>                

    
            
            <Space/>
        
            
        </View>
        </ScrollView>
    );
}

export default FuncionamientoServicioScreen;
