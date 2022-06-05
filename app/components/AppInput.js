
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image } from 'react-native';
import { Colors, Dimensions } from '../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Images from '../constants/images';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
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
        color: Colors.blue300,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        paddingVertical: 10,
        fontSize: Dimensions.px14,
        width: Dimensions.deviceWidth - 100,
        marginTop:0,
        paddingTop:0,
    }
})

function AppInput({ label, containerStyle = {}, password = false, errorMessage, ...props }) {
    const [focused, setFoucused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    return (
        <View style={[containerStyle, styles.container, !focused && { backgroundColor: Colors.transparent }]}>
            <Text style={styles.label}>{label}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput
                
                    {...props}
                    //autoCapitalize={'none'}
                    autoCompleteType={'off'}
                    autoCorrect={false}
                    secureTextEntry={password && !showPassword}
                    style={[styles.input, focused && { borderBottomColor: Colors.white, }]}
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

export default AppInput