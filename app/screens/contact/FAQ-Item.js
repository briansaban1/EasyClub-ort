
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import { AppText, FlexWrapper } from '../../components/styled-components';
import styles from './styles';
import { Colors } from '../../constants';

function FaqItem({ data, active, onPress }) {
    const { question, answer } = data
    return (
        <>
            <TouchableOpacity
                onPress={onPress}
                style={[styles.menuButton, { borderBottomColor: Colors.border, borderBottomWidth: 1 }]}
            >
                <FlexWrapper>
                    <Image
                        source={require('@assets/contact/question.png')}
                        style={{ width: 17, height: 17, resizeMode: 'contain', marginRight: 10 }}
                    />
                    <AppText fontSize={15}>{question}</AppText>
                </FlexWrapper>
                <Image
                    source={active ? require('@assets/arrow-top.png') : require('@assets/arrow-bottom.png')}
                    style={{ width: 14, height: 7, resizeMode: 'contain' }}
                />
            </TouchableOpacity>
            {
                active && (
                    <View style={styles.answer}>
                        <AppText fontSize={14}>{answer}</AppText>
                    </View>
                )
            }
        </>
    )
}

export default FaqItem