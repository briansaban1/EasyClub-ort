import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from '../../components';
import styles from './styles';
import { AppText } from '../../components/styled-components';
import { Colors, Dimensions } from '../../constants';
import { openTermsOfService } from '../../utils';

const notes = "Hacia fines del 1990 se creó EasyClub, un centro deportivo ...."

function HelpScreen() {

    return (
        <View style={styles.container}>
            <Header
                title={"Acerca De"}
            />
            <AppText style={styles.notes}>
                {notes}
                {"\n"}
                <AppText
                    color={Colors.blue}
                    style={{ fontSize: Dimensions.px15 }}
                    onPress={() => { openTermsOfService() }}
                >{"Términos & Condiciones."}</AppText>
            </AppText>

        </View>
    );
}

export default HelpScreen;
