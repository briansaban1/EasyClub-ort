import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Colors } from '../constants';


export default class BallWrapper extends Component {

    render() {
        const { step } = this.props
        return (
            <View style={styles.container} >
                <View style={step == 1 ? styles.fulBall : styles.ball} >
                    <Text style={step == 1 ? styles.activeText : styles.inActiveText}>1</Text>
                    <Text style={styles.description}>1er Paso</Text>
                </View>
                <View style={styles.hr} />
                <View style={step == 2 ? styles.fulBall : styles.ball} >
                    <Text style={step == 2 ? styles.activeText : styles.inActiveText}>2</Text>
                    <Text style={styles.description}>2do Paso</Text>
                </View>
                <View style={styles.hr} />
                <View style={step == 3 ? styles.fulBall : styles.ball} >
                    <Text style={step == 3 ? styles.activeText : styles.inActiveText}>3</Text>
                    <Text style={styles.description}>3er Paso</Text>
                </View>

            </View>

        );
    }

}
const ballSize = 40
const color = Colors.blue

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        margin: 20,
        marginBottom:30
    },
    ball: {
        width: ballSize,
        height: ballSize,
        borderRadius: ballSize / 2,
        borderWidth: 2,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fulBall: {
        width: ballSize,
        height: ballSize,
        borderRadius: ballSize / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center'
    },
    hr: {
        width: 70,
        borderBottomColor: color,
        borderBottomWidth: 2
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