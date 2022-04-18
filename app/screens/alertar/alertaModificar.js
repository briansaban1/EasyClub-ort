import React, { useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Header, SearchInput, AlertaModal, SubmissionAlerta } from '../../components';
import { AppStyles, Images } from '../../constants';
import styles from './styles';


function HistoryScreen() {

    const profile = useSelector(store => store.user.profile)
    const _submissions1 = useSelector(store => store.user.submissions1)
    const [submissions1, setSubmissions1] = useState(_submissions1)
    
    const [visibleModal, setVisibleModal] = useState(false);
    const [modalData, setModalData] = useState({});
    return (
        <>
            <ScrollView style={styles.container}>
                <Header
                    title={"Modificar Alerta"}
                    description={'Seleccioná el paquete'}
                />
                
                <View style={{height:20}} />

                {_submissions1.length == 0 &&
                    <Image
                        source={Images.submissionEmpty}
                        style={AppStyles.submissionEmpty}
                    />
                }
                {submissions1.map(i => <SubmissionAlerta data={i} profile={profile} onPress={(data) => {
                    setModalData(data);
                    setVisibleModal(true);
                }} />)}
                <View style={{height:30}} />
            </ScrollView>
            {visibleModal && <AlertaModal onClose={() => { setVisibleModal(false) }} data={modalData} />}
        </>
    );
}

export default HistoryScreen;
