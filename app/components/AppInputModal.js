
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { Colors, Dimensions } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../constants/images';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingLeft: 20,
        marginRight: 25,
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
    password: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
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
    input: {
        color: Colors.blue400,
        borderColor: '#A8B3C8',
        borderWidth: 1,
        paddingVertical: 0,
        fontSize: Dimensions.px14,
        width: '100%',
        marginTop:0,
        paddingTop:5,
        borderRadius: 10,
        minHeight: 70,
        padding: 10
        
    }
})

function AppInputModal({ label, containerStyle = {}, password = false, errorMessage, ...props }) {
    const [focused, setFoucused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View style={[containerStyle, styles.container, !focused && { backgroundColor: Colors.transparent }]}>
            <Text style={styles.label}>{label}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                    {...props}
                    autoCapitalize={'none'}
                    autoCompleteType={'off'}
                    autoCorrect={false}
                    secureTextEntry={password && !showPassword}
                    style={[styles.input, focused && { }]}
                    onFocus={() => { setFoucused(true) }}
                    onBlur={() => { setFoucused(false) }}
                />
                <TouchableOpacity
                    disabled={!password}
                    style={styles.button}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Image
                        style={password ? styles.password : [styles.icon, (!Boolean(props.value) || Boolean(errorMessage)) && { tintColor: Colors.transparent }]}
                        source={password && Images.ShowPassword(showPassword) || Images.Check(Boolean(props.value))}
                    />
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

export default AppInputModal