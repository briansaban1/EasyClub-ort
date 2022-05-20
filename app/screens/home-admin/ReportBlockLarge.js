import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText } from '../../components/styled-components';
import Button from '../../components/Button';
import styles from './styles';
import { Colors } from '../../constants';

function ReportBlockLarge({ active, onPress, label, description }) {
    return (
        <TouchableOpacity
            style={[styles.bottomBlockLarge, active && { backgroundColor: Colors.white }]} activeOpacity={0.8}>
            <AppText style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 5,
                color: active ? Colors.darkblue : Colors.lightblue
            }}>{label}</AppText>
            <AppText style={{ fontSize: 13, color: active ? Colors.blue400 : Colors.lightblue }}>{description}</AppText>
            <Button
                text={"Generar Reporte"}
                buttonStyle={{ width:'55%', backgroundColor: Colors.blue300, position: 'relative', height: 45 }}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
}

export default ReportBlockLarge;
