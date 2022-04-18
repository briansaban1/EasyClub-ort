import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { Colors, Dimensions } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../constants/images';
import ModalDropdown from 'react-native-modal-dropdown-v2';
import { FlexBetweenWrapper, FlexBetweenWrapper1, FlexBetweenWrapperNew } from './styled-components';

const styles = StyleSheet.create({
    container: {
        //backgroundColor: Colors.white,
        paddingLeft: 30,
        marginRight: 30,
        marginBottom: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    label: {
        color: Colors.blue400,
        fontSize: Dimensions.px15,
        paddingVertical: 10,
        marginTop:-3,
    },

    icon: {
        width: 16,
        height: 16,
        resizeMode: 'contain'
    },
    button: {
        width: 40,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    value: {
        color: Colors.blue300,
        fontSize: Dimensions.px15,

    },
    dropdownContainerStyle: {
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        width: Dimensions.deviceWidth - Dimensions.px60,
    }
})

function DropDownGrande({ label, onSelect, value, containerStyle = {}, options = [], ...props }) {


    return (
        <View style={[containerStyle, styles.container]}>
            <Text style={styles.label}>{label}</Text>
            <ModalDropdown
                options={options}
                defaultIndex={-1}
                defaultValue={value}
                textStyle={{ fontSize: 15, color: Colors.blue400 }}
                dropdownTextStyle={{ fontSize: 15, color: Colors.blue400, backgroundColor: Colors.lightbackground, }}
                dropdownStyle={{
                    width: Dimensions.deviceWidth - Dimensions.px150,
                    height: 193,
                    
                }}
                style={styles.dropdownContainerStyle}
                onSelect={onSelect}
            >
                <FlexBetweenWrapperNew>
                    <Text style={styles.value}>{value}</Text>
                    <TouchableOpacity
                        disabled
                        style={styles.button}
                        onPress={() => { }}
                    >
                        <Image
                            style={styles.icon}
                            source={require('@assets/dropdown.png')}
                        />
                    </TouchableOpacity>
                </FlexBetweenWrapperNew>
            </ModalDropdown>
        </View>
    )
}

export default DropDownGrande