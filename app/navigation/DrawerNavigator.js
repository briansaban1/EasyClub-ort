import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import TabNavigator from './TabNavigator';
import History from '../screens/history'
import Notifications from '../screens/notifications'
import Profile from '../screens/profile'
import ChangeEmail from '../screens/change-email'
import DeleteAccount from '../screens/delete-account'

import ChangePassword from '../screens/change-password'
import Help from '../screens/help'
import Sessions from '../screens/sessions'
import Contact from '../screens/contact'
import ContactUs from '../screens/contact/contact-us'
import Reservas from '../screens/reservas'
import Billetera from '../screens/wallet'

import GenerarReserva from '../screens/reservas/reserva' 
import ExitoReserva from '../screens/reservas/exitoReserva'

import RealizarPago from '../screens/pago'


import Home from '../screens/home'


import ComoLlegar from '../screens/mapas'

import Facturas from '../screens/facturas'
import Obtenerlos from '../screens/points/obtenerlos.js';
import Canjear from '../screens/points/canjear.js';




import Funcionamiento from '../screens/funcionamiento'
import Politicas  from "../screens/contact/politicas";
import Consultas from "../screens/contact/contact-item";
import Funcionamiento1 from "../screens/funcionamiento/funcionamiento";
import Pago from "../screens/funcionamiento/pago";


import DrawerContent from '../screens/side-menu'
import Dimension from '../constants/dimensions';

const Drawer = createDrawerNavigator();

function App() {
    return (
        <Drawer.Navigator
            initialRouteName="TabNavigator"
            drawerStyle={{width:Dimension.deviceWidth-100}}
            drawerContent={props => <DrawerContent {...props} />}
        >
            <Drawer.Screen name="TabNavigator" component={TabNavigator} />
            <Drawer.Screen name="History" component={History} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="ChangeEmail" component={ChangeEmail} />
            <Drawer.Screen name="DeleteAccount" component={DeleteAccount} />
            

            <Drawer.Screen name="ChangePassword" component={ChangePassword} />
            <Drawer.Screen name="Help" component={Help} />
            <Drawer.Screen name="Sessions" component={Sessions} />
            <Drawer.Screen name="Contact" component={Contact} />
            <Drawer.Screen name="ContactUs" component={ContactUs} />
            <Drawer.Screen name="Reservas" component={Reservas} />
            
            <Drawer.Screen name="RealizarPago" component={RealizarPago} />

            <Drawer.Screen name="Home" component={Home} />

            <Drawer.Screen name="Billetera" component={Billetera} />

            <Drawer.Screen name="Facturas" component={Facturas} />

            <Drawer.Screen name="Obtenerlos" component={Obtenerlos} />
            <Drawer.Screen name="Canjear" component={Canjear} />

            <Drawer.Screen name="Funcionamiento" component={Funcionamiento} />
            <Drawer.Screen name="Politicas" component={Politicas} />
            <Drawer.Screen name="Consultas" component={Consultas} />

            <Drawer.Screen name="Funcionamiento1" component={Funcionamiento1} />
            <Drawer.Screen name="Pago" component={Pago} />

            <Drawer.Screen name="GenerarReserva" component={GenerarReserva} />
            <Drawer.Screen name="ComoLlegar" component={ComoLlegar} />
            <Drawer.Screen name="ExitoReserva" component={ExitoReserva} />




        </Drawer.Navigator>
    );
}

export default App;
