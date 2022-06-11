import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import { useSelector } from 'react-redux';
import Home from '../screens/home';
import HomeAdmin from '../screens/admin/home-admin';
import Offers from '../screens/offers'
import Points from '../screens/points'
import Options from '../screens/options'
import TabBar from './TabBar';


const Tab = createBottomTabNavigator();

function TabNavigator({route}) {
  const profile = useSelector(store => store.user.profile);
  console.log(profile.id_TipoUsuario, 'user')
  return (
    profile.id_TipoUsuario==1 ?  
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
          borderTopColor:'#fff',
          position:'absolute'
          //display: profile.id_TipoUsuario==1 ? 'none' : 'flex'
        },
      }}
      backBehavior={'history'}>
        <Tab.Screen name="Home" component={HomeAdmin} />
      <Tab.Screen name="Promociones" component={Offers} />
      <Tab.Screen name="Puntos" component={Offers} />      
      <Tab.Screen name="Opciones" component={Options} />
    </Tab.Navigator>
    :
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
          borderTopColor:'#fff',
          zIndex:999
          //position:'absolute',
          //display: profile.id_TipoUsuario==1 ? 'none' : 'flex'
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
