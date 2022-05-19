import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AppText } from '../../components/styled-components';
import styles from './styles';
import { Colors } from '../../constants';

function BottomBlock({ active, onPress, label, total, count, description }) {
    const width = parseInt(count || 0) / (total || 1) * 100
    return (
        <TouchableOpacity
            style={[styles.bottomBlock, active && { backgroundColor: Colors.darkblue }]}
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
            <AppText style={{ fontSize: 13, color:active?Colors.white:Colors.lightblue, marginBottom: 10, }}>{description}</AppText>
        </TouchableOpacity>
    );
}

export default BottomBlock;
