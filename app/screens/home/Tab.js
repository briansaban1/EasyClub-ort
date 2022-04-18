import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { FlexBetweenWrapper, AppText } from '../../components/styled-components';
import styles from './styles';
import { Dimensions, Colors } from '../../constants';

function Tab({ label, source, active, onPress, left = true, right = false, }) {
    return (
        <TouchableOpacity
            disabled={active}
            onPress={onPress}
            style={[
                
                styles.tab,
                active && {
                    backgroundColor: "#f0f0f0",
                    borderTopLeftRadius: right ? 0 : 15,
                    borderTopRightRadius: left ? 0 : 0,
                    borderTopRightRadius: right ? 15 : 0,
                },
                !active && {
                    borderTopLeftRadius: right ? 0 : 15,
                    borderTopRightRadius: left ? 0 : 15,
                    borderTopRightRadius: right ? 15 : 0,
                }
               
               
                ]}>
            <Image
                style={styles.tabIcon}
                source={source}
            />
            <AppText
                style={{
                    fontSize: Dimensions.px15,
                    marginTop: 10
                }}>{label}</AppText>
        </TouchableOpacity>
    );
}

export default Tab;
