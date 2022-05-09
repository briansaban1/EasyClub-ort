import React, { useState, Component } from 'react';
import { Linking, View, ScrollView, StyleSheet } from 'react-native';
import { Header, ImageButton } from '../../components';
import { Divider, Space, Loader } from '../../components/styled-components';
import Item from './Item';
import styles from './styles';
import { Title } from '../../components/Header';
import data from './data'
import FAQItem from './FAQ-Item';
import { WebView } from 'react-native-webview';
import { Colors, Dimensions } from '../../constants';

function PoliticasScreen() {
    const [selected, setSelected] = useState(null);
    function openURL(url) {
        Linking.openURL(url)
    }
    return (
        <View style={styles.container}>
            <Header
                title={"Términos y Condiciones"}


            />
            <ScrollView contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>

                <View style={{ height: 15 }}></View>

                <View style={{ height: Dimensions.deviceHeight * 0.80, width: Dimensions.deviceWidth * 1.0 }}>
                    <WebView
                        style={{ flex: 1 }}
                        source={{ uri: "https://easyclub.000webhostapp.com/politicas/" }}
                    />

                </View>



            </ScrollView>

        </View>
    );
}

export default PoliticasScreen;
