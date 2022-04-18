import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { Colors, Dimensions } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../constants/images';
import ModalDropdown from 'react-native-modal-dropdown-v2';
import { FlexBetweenWrapper, FlexBetweenWrapperAlertas } from './styled-components';


const styles = StyleSheet.create({
    container: {
        //backgroundColor: Colors.white,
        paddingLeft: 0,
        marginRight: 35,
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
        width: 15,
        height: 15,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom:25,
        marginLeft:-2
    },
    button: {
        width: 40,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth:25,
    },
    value: {
        color: Colors.blue400,
        fontSize: Dimensions.px13,
        resizeMode: 'contain',
        alignItems: 'center',
        justifyContent: 'center',
        padding:7,
        marginTop:-25
    },
    dropdownContainerStyle: {
        color: Colors.blue400,
        borderColor: '#A8B3C8',
        borderWidth: 1,
        width: '100%',
        borderRadius: 5,
        height: 37,
        backgroundColor:'#fff'
    }
})

function DropDownAlerta({ label, onSelect, value, containerStyle = {}, options = [], ...props }) {


    return (
        <View style={[containerStyle, styles.container]}>
            <Text style={styles.label}>{label}</Text>
            <ModalDropdown
                options={options}
                defaultIndex={-1}
                defaultValue={value}
                textStyle={{ fontSize: 14, color: Colors.blue400, }}
                dropdownTextStyle={{ fontSize: 15, color: Colors.blue400, backgroundColor: Colors.lightbackground, }}
                dropdownStyle={{
                    width: 150,
                    height: 150,
                    
                }}
                style={styles.dropdownContainerStyle}
                onSelect={onSelect}
            >
                <FlexBetweenWrapperAlertas>
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
                </FlexBetweenWrapperAlertas>
            </ModalDropdown>
        </View>
    )
}

export default DropDownAlerta