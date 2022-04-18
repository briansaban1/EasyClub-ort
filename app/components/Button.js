
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, ActivityIndicator } from 'react-native';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import styled from 'styled-components/native';

const TouchableOpacity = styled.TouchableOpacity`
  height: 50px;
  width:${Dimensions.deviceWidth - 60}px;
  border-radius: 10px;
  align-items: center;
  align-self: center;
  justify-content: center;
  background-color: ${(props) => props.backgroundColor || Colors.blue};
  margin-top: 20px;
`;

const styles = StyleSheet.create({
    button: {
        height: 50,
        borderRadius: 10,
        width: Dimensions.deviceWidth - 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue,
        marginTop: 20
    },
    text: {
        color: Colors.white,
        fontSize: Dimensions.px18,
        fontWeight: 'bold'
    }
})

function Button({ buttonStyle, text, onPress, textColor, loading = false, disabled = false }) {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[buttonStyle, disabled && { opacity: 0.7 }]}
            onPress={onPress}
        >
            {loading ? <ActivityIndicator color={textColor || Colors.white} /> : <Text style={[styles.text, textColor && { color: textColor }]}>{text}</Text>}
        </TouchableOpacity>
    )
}

export default Button