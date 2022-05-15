import React, { useState } from 'react';

import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { FlexBetweenWrapper, Space } from '../../components/styled-components';

import ReportBlockLarge from './ReportBlockLarge';


function Reportes() {
  
    const resumen = useSelector(store => store.user.resumen);

    const [selectedBottom, setSelectedBottom] = useState(0);


    return (
        <View >           
            <Space />
            <FlexBetweenWrapper paddingHorizontal={30}>
            <ReportBlockLarge
                    active={true}
                    //onPress={() => { setSelectedBottom(4) }}
                    label={'Totales'}
                    description={'Actividades Realizadas en el año'}
                />
               
            </FlexBetweenWrapper>
            
        </View>
    );
}
export default Reportes;
