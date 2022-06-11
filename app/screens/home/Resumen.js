import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Alert, Text, View, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FlexBetweenWrapper, FlexBetweenWrapper1, Heading2, Space, Loader } from '../../components/styled-components';
import { Colors } from '../../constants';
import { safeGetOr } from '../../utils/fp';
import BottomBlock from './BottomBlock';
import BottomBlockLarge from './BottomBlockLarge';
import { useNavigation } from '@react-navigation/native';
import { getGrafico } from '../../store/user/action';

import WService from '../../service/WebService';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

  const wservice = new WService();


function ResumenComponent() {
    const {navigate} = useNavigation();
    const dispatch = useDispatch();
  
    const resumen = useSelector(store => store.user.resumen);
    const grafico = useSelector(store => store.user.grafico);

    const [selectedBottom, setSelectedBottom] = useState(0);
    

    const profile = useSelector(store => store.user.profile)
    const [data, setData] = useState(grafico);
    const [loading, setLoading] = useState(true);



    console.log(data);

    return (
        <View >
            <Heading2 color={Colors.darkblue} marginTop={20} marginLeft={30}>{'Resumen'}</Heading2>
            <Space />
            <FlexBetweenWrapper1 paddingHorizontal={30}>
            <BottomBlock
                    active={selectedBottom == 0}
                    onPress={() => { setSelectedBottom(0) }}
                    label={'Hoy'}
                    total={safeGetOr(1, 'dia')(resumen)}
                    count={safeGetOr(0, 'dia')(resumen)}
                    description={'Actividades por realizar\nel día de hoy'}
                />
                
                <BottomBlock
                    active={selectedBottom == 1}
                    onPress={() => { setSelectedBottom(1) }}
                    label={'Semanal'}
                    total={safeGetOr(1, 'semana')(resumen)}
                    count={safeGetOr(0, 'semana')(resumen)}
                    description={'Actividades realizadas\nentre semanas'}
                />
                
            </FlexBetweenWrapper1>
            <FlexBetweenWrapper1 paddingHorizontal={30}>
            <BottomBlock
                    active={selectedBottom == 2}
                    onPress={() => { setSelectedBottom(2) }}
                    label={'Mensual'}
                    total={safeGetOr(1, 'mes')(resumen)}
                    count={safeGetOr(0, 'mes')(resumen)}
                    description={'Actividades realizadas\nen el mes'}
                />
           
            <BottomBlock
                    active={selectedBottom == 3}
                    onPress={() => { setSelectedBottom(3) }}
                    label={'No Realizado'}
                    total={safeGetOr(1, 'cancelado')(resumen)}
                    count={safeGetOr(0, 'cancelado')(resumen)}
                    description={'Actividades que has\ncancelado'}
                />
               
            </FlexBetweenWrapper1>
            <FlexBetweenWrapper paddingHorizontal={30}>
            <BottomBlockLarge
                    active={true}
                    //onPress={() => { setSelectedBottom(4) }}
                    label={'Totales'}
                    total={safeGetOr(1, 'total')(resumen)}
                    count={safeGetOr(0, 'total')(resumen)}
                    description={'Actividades Realizadas en el año'}
                />
               
            </FlexBetweenWrapper>
            
        </View>
    );
}
export default ResumenComponent;
