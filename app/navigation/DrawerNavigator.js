import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import TabNavigator from './TabNavigator';
import History from '../screens/history'
import Notifications from '../screens/notifications'
import Profile from '../screens/profile'
import ChangeEmail from '../screens/change-email'
import ChangePassword from '../screens/change-password'
import Help from '../screens/help'
import Sessions from '../screens/sessions'
import Contact from '../screens/contact'
import ContactUs from '../screens/contact/contact-us'
import Alertar from '../screens/alertar'
import Billetera from '../screens/wallet'

import Reservas from '../screens/alertar/reserva'



import AlertasModificar from '../screens/alertar/alertaModificar';

import Facturas from '../screens/facturas'
import Correos from '../screens/correo'
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
            <Drawer.Screen name="ChangePassword" component={ChangePassword} />
            <Drawer.Screen name="Help" component={Help} />
            <Drawer.Screen name="Sessions" component={Sessions} />
            <Drawer.Screen name="Contact" component={Contact} />
            <Drawer.Screen name="ContactUs" component={ContactUs} />
            <Drawer.Screen name="Alertar" component={Alertar} />
            <Drawer.Screen name="AlertasModificar" component={AlertasModificar} />

            <Drawer.Screen name="Billetera" component={Billetera} />

            <Drawer.Screen name="Facturas" component={Facturas} />
            <Drawer.Screen name="Correos" component={Correos} />

            <Drawer.Screen name="Obtenerlos" component={Obtenerlos} />
            <Drawer.Screen name="Canjear" component={Canjear} />

            <Drawer.Screen name="Funcionamiento" component={Funcionamiento} />
            <Drawer.Screen name="Politicas" component={Politicas} />
            <Drawer.Screen name="Consultas" component={Consultas} />

            <Drawer.Screen name="Funcionamiento1" component={Funcionamiento1} />
            <Drawer.Screen name="Pago" component={Pago} />

            <Drawer.Screen name="Reservas" component={Reservas} />



        </Drawer.Navigator>
    );
}

export default App;