import React from 'react';
import { Button, Text, View } from 'react-native';
import { FlexBetweenWrapper, AppText } from '../../components/styled-components';
import styles from './styles';
import { Dimensions, Colors } from '../../constants';

function Block({ label, value }) {
    return (
        <View>
            <AppText style={{
                fontSize: Dimensions.px15,
                marginBottom: 10
            }}>{label}</AppText>
            <AppText
                style={{
                    fontSize: Dimensions.px17,
                    color: Colors.darkblue,
                    fontWeight: 'bold'
                }}
            >{value}</AppText>
        </View>
    );
}

export default Block;
