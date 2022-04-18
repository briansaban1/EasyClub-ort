import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from '../../components';
import { Title } from '../../components/Header';
import { Divider, Space } from '../../components/styled-components';
import Item from '../contact/Item';
import styles from './styles';
import Screens from '../../constants/screens';


function FuncionamientoScreen() {

    return (
        <ScrollView style={styles.container}>

        <View>
            <Header
                title={"Funcionamiento"}
            />

            <View style={styles.card}>
                <Item
                    label={"Funcionamiento del Servicio"}
                    source={require('@assets/contact/question.png')}
                    screen={Screens.Funcionamiento1}
                />
                <Divider />
                <Item
                    label={"Formas de Pago"}
                    source={require('@assets/contact/shipping-quote.png')}
                    screen={Screens.Pago}
                />
               
            </View>
            <Space/>
            
        </View>
        </ScrollView>

    );
}

export default FuncionamientoScreen;
