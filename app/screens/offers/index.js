import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header } from '../../components';
import styles from './styles';
import { Divider, Space, Loader } from '../../components/styled-components';

import { WebView } from 'react-native-webview';
import { Colors, Dimensions } from '../../constants';
function OptionsScreen() {

    return (
        <View style={styles.container}>
        <Header
           title={"Promociones"}
           

        />

<Divider />
        
<View>
                        <Text style={styles.Colors}>PROMOCIONES...</Text>
                       
                    </View>

        
        <Space/>
        
    </View>
    );
}

export default OptionsScreen;
