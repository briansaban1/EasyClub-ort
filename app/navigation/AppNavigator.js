import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack';
import React from 'react';
import { navigationRef } from './RootNavigation';
import MainApp from './DrawerNavigator';
import Login from '../screens/login';
import Pass from '../screens/pass';

import NewUser from '../screens/signup/new-user';
import SignupData from '../screens/signup/signup-data';
import SignupDelivery from '../screens/signup/signup-delivery';
import SignupFinal from '../screens/signup/signup-final';
import Exito from '../screens/signup/exito';

import { Colors } from '../constants';

const options = { headerShown: false };


const AppStack = createStackNavigator();


function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.lightbackground,
    },
  };
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={theme}
    >
      <AppStack.Navigator
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        initialRouteName={'Login'}
      >
        <AppStack.Screen
          name={'Login'}
          component={Login}
          options={options}
        />
        <AppStack.Screen
          name={'Pass'}
          component={Pass}
          options={options}
        />
        <AppStack.Screen
          name={'NewUser'}
          component={NewUser}
          options={options}
        />
        <AppStack.Screen
          name={'SignupData'}
          component={SignupData}
          options={options}
        />
        <AppStack.Screen
          name={'SignupDelivery'}
          component={SignupDelivery}
          options={options}
        />
        <AppStack.Screen
          name={'SignupFinal'}
          component={SignupFinal}
          options={options}
        />
        <AppStack.Screen
          name={'Exito'}
          component={Exito}
          options={options}
        />
        <AppStack.Screen
          name={'MainApp'}
          component={MainApp}
          options={options}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
