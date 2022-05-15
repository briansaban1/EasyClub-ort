import React from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';
import { FlexBetweenWrapper, AppText } from '../../components/styled-components';
import styles from './styles';
import { Dimensions, Colors } from '../../constants';

function BottomBlockLarge({ active, onPress, label, total, count, description }) {
    const width = parseInt(count || 0) / (total || 1) * 100
    return (
        <TouchableOpacity
            style={[styles.bottomBlockLarge, active && { backgroundColor: Colors.darkblue }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <AppText style={{
                fontSize: 15,
                marginBottom: 10,
                color:active?Colors.white:Colors.lightblue
            }}>{label}</AppText>
            <AppText
                style={{
                    fontSize: 22,
                    color: active ? Colors.white : Colors.darkblue,
                    fontWeight: 'bold',
                    alignSelf: 'center'
                }}
            >{count}</AppText>
            <View style={[styles.bottomBlockHr, active && { backgroundColor: "#1D355D" }]}>
                <View style={[styles.bottomSubBlockHr, { width: `${width}%` }, active && { backgroundColor: "white" }]}>
                </View>
            </View>
            <AppText style={{ fontSize: 13, color:active?Colors.white:Colors.lightblue }}>{description}</AppText>
        </TouchableOpacity>
    );
}

export default BottomBlockLarge;
