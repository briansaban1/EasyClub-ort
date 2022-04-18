
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, LayoutAnimation } from 'react-native';
import { Colors, Dimensions } from '../constants';
import Images from '../constants/images';
import styled from 'styled-components/native';
import ImageButton from './ImageButton';
import { FlexBetweenWrapper, Heading2, AppText } from './styled-components';
import { useNavigation } from '@react-navigation/native';

export const Title = styled(AppText)`
 color:${Colors.darkblue};
 font-size:${Dimensions.px25};
 font-weight:bold;
 margin-vertical: 10px;
`


const styles = StyleSheet.create({
    headerIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
})

function Header({ title, description }) {
    const { goBack, canGoBack } = useNavigation();
    return (
        <View style={{ paddingHorizontal: 30 }}>
            <SafeAreaView />
            <FlexBetweenWrapper  >
                <ImageButton
                    source={Images.Back}
                    imageStyle={styles.headerIcon}
                    onPress={() => { if (canGoBack()) { goBack() } 
                    
                }}
                    
                />
            </FlexBetweenWrapper>
            <Title>{title}</Title>
            {Boolean(description) && <AppText>{description}</AppText>}
        </View>
    )
}

export default Header