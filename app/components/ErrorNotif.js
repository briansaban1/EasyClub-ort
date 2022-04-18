import React, { Component } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Colors, Images, AppStyles } from '../constants';
import { Space, AppText } from '../components/styled-components';


export default class Error extends Component {

    render() {
        
        return (
            <View style={styles.container}>
                <Image
                    source={Images.submissionEmpty}
                    style={styles.banner}
                />
                
                <AppText style={{alignItems: 'center', justifyContent: 'center', textAlign:'center', fontSize: 16, fontWeight: '500', width:'60%', marginTop:10}}>
                    {'De momento no tenés ninguna notificación'}
                    </AppText>
            </View>

        );
    }

}


const styles = StyleSheet.create({
    banner:{
        width: Dimensions.get("window").width * 0.8,
        height: Dimensions.get("window").height*0.2,
        alignSelf: 'center',
        marginVertical: 5,
        resizeMode: 'contain'
    },
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        
    },
    activeText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
    },
    inActiveText: {
        color: '#00000070',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
    },
    description:{
        fontSize: 13,
        color: '#00000070',
        fontWeight: 'bold',
        position:'absolute',
        bottom:-25,
        width:100,
        textAlign:'center'
    }
})