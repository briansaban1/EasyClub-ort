import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Colors, Images, AppStyles } from '../constants';
import { Space, AppText } from '../components/styled-components';


export default class Error extends Component {

    render() {
        
        return (
            <View style={styles.container}>
                <Image
                    source={Images.submissionEmpty}
                    style={AppStyles.submissionEmpty}
                />
                
                <AppText style={{alignItems: 'center', justifyContent: 'center', textAlign:'center', fontSize: 16, fontWeight: '500', width:'70%', marginTop:10}}>
                    {'De momento no tenés ningún punto'}
                    </AppText>
            </View>

        );
    }

}


const styles = StyleSheet.create({
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