import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import WService from '../service/WebService';
import ImageButton from './ImageButton';
import { AppText, FlexWrapper, Loader, Space } from './styled-components';

const wservice = new WService();
const detalle1 = String();

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
        color: Colors.darkblue
    },
    label: {
        width: '30%',
    },
    right: {
        width: '70%',
    },
    close: {
        width: 15,
        height: 15,
        margin: 15,
    },
    list: {
        flex: 1,
        marginTop: 20,
    }
});

const TrackModal = ({
    data,
    onClose,
}) => {
    const [hisotry, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        wservice.tracking(data.color)
            .then(response => {
                if (response.status == 1) {

                    setHistory(response.data.map(item => ({
                        title: item.historial,
                        description: item.detalle,
                        icon: (item.historial != 'Para entregar!' || item.historial != 'Entregado!') && require('@assets/tracking-success.png')
                            || require('@assets/tracking-empty.png')

                          
                    })));
                    
                    
                }
                setLoading(false)
            }).catch(e => {
                setLoading(false)
            })
    }, [])

 

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
                        <AppText style={styles.title}>{"Rastrear Paquete"}</AppText>
                        <Space />
                        <View style={{ height: Dimensions.deviceHeight * 0.4 }}>
                            {Boolean(hisotry.length) && !loading && <Timeline
                                showTime={false}
                                circleSize={21}
                                lineColor='rgb(119,176,72)'
                                titleStyle={{ color: Colors.darkblue, marginTop: -10 }}
                                descriptionStyle={{ color: Colors.lightblue }}
                                innerCircle={'icon'}
                                options={{
                                    style: { paddingTop: 5 }
                                }}
                                data={hisotry}
                            />
                            }
                            {loading && <Loader color={Colors.darkblue} style={{ flex: 1 }} />}
                        </View>
                        <Space />
                        <AppText style={styles.title}>{"Detalles del Tracking"}</AppText>
                        <Space />
                        <FlexWrapper>
                            <AppText style={styles.label}>{data.placa}</AppText>
                            <AppText style={styles.right} color={'blue'}>{data.color}</AppText>
                        </FlexWrapper>
                        <Space />
                        <FlexWrapper style={{ alignItems: 'flex-start' }}>
                            <AppText style={styles.label}>{moment(data.fecha).format("MMM DD, YYYY")}</AppText>
                            <AppText style={styles.right}>{data.ciudad}</AppText>
                        </FlexWrapper>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TrackModal;
