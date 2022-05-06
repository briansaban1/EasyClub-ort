import React, { useEffect, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Header, ErrorNotif } from '../../components';
import styles from './styles';
import WService from '../../service/WebService';
import { useSelector } from 'react-redux';
import { safeGetOr } from '../../utils/fp';
import { AppText, CenterText, Space, Loader } from '../../components/styled-components';
import ImageButton from '../../components/ImageButton';
import { Colors, Dimensions } from '../../constants';


import moment from 'moment'

const wservice = new WService();

function Item({ texto: platform, ip, fecha: time, id: id }) {
    const [display, setDelete] = useState(id)



    return (
        <View style={styles.item}>

            <View>
                <AppText style={styles.platform}>{platform}</AppText>
                <AppText style={styles.fecha}>{`Fecha: ${moment(time).format('DD/MM/YYYY')}`}</AppText>


            </View>



        </View>
    )
}

function NotificationsScreen() {
    const profile = useSelector(store => store.user.profile)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        wservice.getSessions1(safeGetOr("", "id_usuario")(profile))
            .then(response => {
                console.log(response)
                if (response.status == 1) {
                    setData(response.data)
                }
                setLoading(false)
            })
    }, [])


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 35 }} showsVerticalScrollIndicator={false}>


            <Header
                title={"Notificaciones"}
            />
            <Space />
            {data.length == 0 &&
            <View>
                <ErrorNotif /> 
                </View>
            }
            {!loading && data.map(i => (<Item key={i.id} {...i} />))}
            {loading && <Loader color={Colors.darkblue} style={{ flex: 1 }} />}


        </ScrollView>
    );
}


export default NotificationsScreen;
