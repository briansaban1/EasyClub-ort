import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Header } from '../../components';
import styles from './styles';
import WService from '../../service/WebService';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import { AppText, CenterText, Space } from '../../components/styled-components';
import { Images } from '../../constants';
import moment from 'moment'

const wservice = new WService();

function Item({ dispositivo: platform, ip, fecha: time }) {
    console.log({ time })
    return (
        <View style={styles.item}>
            <Image
                source={Images.PlatformImage(platform)}
                style={styles.image}
            />
            <View style={{width:'90%'}}>
                <AppText style={styles.actividad}>{`Última actividad ${moment(time).format('DD/MM/YYYY, HH:mm')}hs`}</AppText>
                <AppText style={styles.platform}>Dispositivo: {platform}</AppText>
            </View>
        </View>
    )
}

function SessionsScreen() {
    const profile = useSelector(store => store.user.profile)
    const [data, setData] = useState([])

    useEffect(() => {
        wservice.getSessions(safeGetOr("", "id_usuario")(profile))
            .then(response => {
                console.log(response)
                if (response.status == 1) {
                    setData(response.data)
                }
            })
    }, [])

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>

            <View >
                <Header
                    title={"Historial de Sesiones"}
                />
                <Space />
                {data.map(i => (<Item key={i.id} {...i} />))}

            </View>
        </ScrollView>
    );
}

export default SessionsScreen;
