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



function FuncionamientoScreen() {

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
                  Utilizando nuestro servicio podés ....
                  </Text>
      </View>
      </View>


      <View style={{ width: "100%", marginTop: 10, alignContent:"center", alignItems:"center", }}>
      <View style={styles.sub_bg}>
      
        <Text style={styles.text16}>¿Qué actividades se pueden reservar?</Text>
        <View style={{flexDirection: "row", width:'100%', marginLeft: 5, marginBottom: 7, marginTop: 5,}}>
        <Text style={styles.text171}><Text style={styles.text161}>Tenis </Text>
                  </Text>
                  </View>

        <View style={{flexDirection: "row", width:'100%', marginLeft: 5, marginBottom: 7, marginTop: 5,}}>
        <Text style={styles.text171}><Text style={styles.text161}>Paddle...</Text>
                  </Text>
                  </View>  

      </View>
      </View>
      
      <View style={{ width: "100%", marginTop: 10, alignContent:"center", alignItems:"center", }}>
      <View style={styles.sub_bg}>
      
        <Text style={styles.text16}>¿Cuales son los costos?</Text>
        <Text style={styles.text15}>
        El costo del servicio de envíos varía....
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

export default FuncionamientoScreen;
