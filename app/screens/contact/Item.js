import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { AppText, FlexWrapper } from '../../components/styled-components';
import { Screens } from '../../constants';
import styles from './styles';

function ContactButton({ label, source, screen, onPress }) {
    const { navigate } = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => {
                if (onPress) {
                    onPress();
                } else if (screen == Screens.ContactUs) {
                    navigate(screen, { label })
                } else {
                    screen && navigate(screen)
                }
            }}
            style={styles.menuButton}
        >
            <FlexWrapper>
                <Image
                    source={source}
                    style={{ width: 17, height: 17, resizeMode: 'contain', marginRight: 10 }}
                />
                <AppText fontSize={15}>{label}</AppText>
            </FlexWrapper>
            <Image
                source={require('@assets/ios-arrow-right.png')}
                style={{ width: 7, height: 14, resizeMode: 'contain' }}
            />
        </TouchableOpacity>
    )
}

export default ContactButton