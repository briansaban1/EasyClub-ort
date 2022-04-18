
import React from 'react';
import { View } from 'react-native';

function ShadowDivider({ height = 25 }) {

    return (
        <View style={{ overflow: 'hidden', paddingBottom: height }}>
            <View
                style={{
                    backgroundColor: '#fff',
                    height: 1,
                    shadowColor: '#000',
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.4,
                    shadowRadius: 3,
                    elevation: 5,
                }}
            />
        </View>
    )
}

export default ShadowDivider