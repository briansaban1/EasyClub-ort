import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import ImageButton from './ImageButton';
import { AppText } from './styled-components';



const styles = StyleSheet.create({
    body: {
        width: Dimensions.deviceWidth,
        height: Dimensions.deviceHeight,
        backgroundColor: '#000000cc',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: Colors.white,
        width: Dimensions.deviceWidth,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    mainContainer: {
        width: '100%',
        paddingHorizontal: 30,
        paddingBottom: 50,
    },
    title: {
        fontWeight: 'bold',
        fontSize: Dimensions.px18,
        color:Colors.darkblue
    },
    close: {
        width: 15,
        height: 15,
        margin: 15,
    },
});

const PackageModal = ({
    onClose,
}) => {

    return (
        <Modal
            transparent={true}
            visible={true}
            animationType={'fade'}
            onRequestClose={() => {
                onClose();
            }}>
            <View style={styles.body}>
                <View style={styles.container}>
                    <ImageButton
                        source={Images.Close}
                        imageStyle={styles.close}
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => {
                            onClose();
                        }}
                    />
                    <View style={styles.mainContainer}>
                        <AppText style={styles.title}>{"Editar Paquete"}</AppText>


                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PackageModal;
