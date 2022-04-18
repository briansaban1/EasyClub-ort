

// /<Text style={[styles.welcometitle, { fontSize: 25 }]}>{this.state.user_data.tx_nombre.charAt(0)}{this.state.user_data.tx_apellido.charAt(0)}</Text>


import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { AppText, CenterView } from './styled-components';
import { safeGetOr } from '../utils/fp';

const Container = styled(CenterView)`
  height: 67px;
  width:67px;
  border-radius: 67px;
  align-items: center;
  justify-content: center;
  border-color: #ADE6FE ;
  border-width:2px;
  backgroundColor: #fff;
`;

const styles = StyleSheet.create({

})

function UserAvatar() {
    const profile = useSelector(store => store.user.profile)
    return (
        <Container>
            <AppText>{safeGetOr('', 'tx_nombre')(profile).charAt(0)}{safeGetOr('', 'tx_apellido')(profile).charAt(0)}</AppText>
        </Container>
    )
}

export default UserAvatar