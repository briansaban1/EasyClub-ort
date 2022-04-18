import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {isIphoneX} from 'react-native-iphone-x-helper';
import Home from '../screens/home';
import Offers from '../screens/offers'
import Points from '../screens/points'
import Options from '../screens/options'
import TabBar from './TabBar';


const Tab = createBottomTabNavigator();

function TabNavigator({route}) {

  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      tabBar={(props) => <TabBar {...props} />}
      tabBarOptions={{
        style: {
          height: Platform.OS == 'android' ? 60 : 80,
          paddingBottom: Platform.OS == 'ios' ? 17 : 0,
          alignItems: 'center',
          justifyContent: 'flex-start',
          flex: 1,
          borderTopColor:'#fff'
        },
      }}
      backBehavior={'history'}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Promociones" component={Offers} />
      <Tab.Screen name="Puntos" component={Points} />
      <Tab.Screen name="Opciones" component={Options} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
