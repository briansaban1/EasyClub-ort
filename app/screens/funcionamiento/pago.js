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



function PagosScreen() {

    return (
        <ScrollView style={styles.container}>
        <View >
            <Header
                title={"Formas de Pago"}
            />


<View style={styles.mainContainer}>


   
<View style={{ width: "100%", marginTop: 2, alignContent:"center", alignItems:"center", }}>
      <View style={styles.sub_bg}>
      
                 <Text style={styles.text16}>
                    Las formas de pago son las siguientes: 
                    </Text>
                    <Text style={styles.text15}>
                    - MercadoPago.                    
                    </Text>

                   <Text style={styles.text15}>
					- ....
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

export default PagosScreen;