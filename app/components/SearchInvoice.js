
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import ImageButton from './ImageButton';



const styles = StyleSheet.create({
    container: {
        height: 44,
        width: Dimensions.deviceWidth - 60,
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: Colors.white,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal:15
    },
    search: {
        width: 20,
        height: 20
    },
    voice: {
        width: 30,
        height: 30
    },
    input: {
        color: Colors.blue300,
        fontSize: 13,
        width: Dimensions.deviceWidth - 160,
        paddingVertical:10,
    }
})




function SearchInput({ placeholder = "Buscador de Invoice", ...props }) {




    return (
        <View style={styles.container}>
            <ImageButton
                source={Images.Search}
                imageStyle={styles.search}
            />
            <TextInput
                {...props}
                placeholder={placeholder}
                autoCapitalize={'none'}
                autoCompleteType={'off'}
                autoCorrect={false}
                style={styles.input}
                
            />
             <View />
        </View>
    )
}



export default SearchInput

