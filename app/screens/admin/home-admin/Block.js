import React from 'react';
import { View } from 'react-native';
import { AppText } from '../../../components/styled-components';
import { Dimensions, Colors } from '../../../constants';

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
