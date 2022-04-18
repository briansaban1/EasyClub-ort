import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import { Colors, Images} from '../constants';


const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',

  }
})

const Tab = ({routeName, inactive}) => {

  return (
    <View style={styles.container}>
      <Image
        source={Images.Tabs[routeName]}
        style={[
          {
            resizeMode: 'contain',
            width: 28,
            height: 26,
            tintColor: inactive ? Colors.inactive : Colors.active,
          },
        ]}
      />
      <Text
        style={{
          marginTop: 5,
          fontSize: 12,
          fontWeight: '500',
          color: inactive ? Colors.inactive : Colors.active,
        }}>
        {routeName}
      </Text>
    </View>
  );
};

export default Tab;
