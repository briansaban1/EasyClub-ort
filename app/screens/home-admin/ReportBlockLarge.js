import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AppText } from '../../components/styled-components';
import Button from '../../components/Button';
import styles from './styles';
import { Colors } from '../../constants';

function ReportBlockLarge({ active, onPress, label, description }) {
    return (
        <TouchableOpacity
            style={[styles.bottomBlockLarge, active && { backgroundColor: Colors.darkblue }]}
            
            activeOpacity={0.8}
        >
            <AppText style={{
                fontSize: 24,
                marginBottom: 10,
                color:active?Colors.white:Colors.lightblue
            }}>{label}</AppText>
            <AppText style={{ fontSize: 13, color:active?Colors.white:Colors.lightblue }}>{description}</AppText>
            <Button
                text={"Generar Reporte"}
                buttonStyle={{width:'53%', backgroundColor: Colors.lightblue, position: 'relative', height: 30  }}
                onPress={onPress}
            />
        </TouchableOpacity>
    );
}

export default ReportBlockLarge;
