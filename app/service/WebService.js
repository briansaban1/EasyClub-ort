import { Platform } from 'react-native';
import Config from '../easyclub-export';
import NetworkHelper from './NetworkHelper';

function WService() {
  this.url = Config.API_URL;
}

WService.prototype.makeUrl = function (resource) {
  const url = this.url + resource;
  return url;
};

WService.prototype.login = function (username, password) {

  return NetworkHelper.requestPost(this.makeUrl('login1.php'), {
    flag: 'login',
    user_name: username,
    user_password: password,
    device: Platform.OS,
    version: Platform.Version
  });
  
};


WService.prototype.getUserMenu = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('user_menu.php'), {
    flag: 'user_menu',
    email
  });
};



WService.prototype.getSubmissions = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('vehicle.php'), {
    flag: 'vehicle',
    email
  });
};

WService.prototype.getSubmissions1 = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('historial.php'), {
    flag: 'historial',
    email
  });
};


WService.prototype.getActividades = function () {
  return NetworkHelper.requestPost(this.makeUrl('actividades.php'), {
    flag: 'actividad'
  });
};


WService.prototype.getPuntos = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('puntos.php'), {
    email,
    flag: 'puntos',
  });
};

WService.prototype.getWallet = function (email, username) {
  return NetworkHelper.requestPost(this.makeUrl('wallet.php'), {
    email,
    username,
    flag: 'wallet',
  });
};

WService.prototype.updateProfile = function (profile) {
  return NetworkHelper.requestPost(this.makeUrl('editprofile.php'), {
    flag: 'editprofile',
    nombre: profile.tx_nombre,
    apellido: profile.tx_apellido,
    provincia: profile.tx_provincia,
    direccion: profile.tx_direccion,
    cod: profile.tx_cod,
    telefono: profile.tx_telefono,
    whatsapp: profile.tx_whatsapp,
    id: profile.id_usuario,
    
  });
};

WService.prototype.checkExistingUser = function (checkType,value) {
  return NetworkHelper.requestPost(this.makeUrl('checkExistingUser.php'), {
    token: 'checkExistingUser',
    checkType,
    value
  });
};

WService.prototype.register = function (profile) {
  return NetworkHelper.requestPost(this.makeUrl('signup.php'), {
    ...profile,
    flag: 'signup',
    TipoUsuario: 2
  });
};

WService.prototype.changePassword = function (email, password) {
  return NetworkHelper.requestPost(this.makeUrl('updatepassword.php'), {
    flag: 'updatepassword',
    email,
    password
  });
};

WService.prototype.getSessions = function (usuario) {
  return NetworkHelper.requestPost(this.makeUrl('sesiones.php'), {
    flag: 'sesiones',
    usuario: usuario,
  });
};

WService.prototype.getSessions1 = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('notificaciones.php'), {
    flag: 'notificaciones',
    email,
  });
};




WService.prototype.getCanjear = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('puntos_canje.php'), {
    email,
    flag: 'puntos',
  });
};

WService.prototype.getCorreos = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('listado.php'), {
    flag: 'listado',
    email,
    
  });
};

WService.prototype.getFacturas = function (email) {
  return NetworkHelper.requestPost(this.makeUrl('facturas.php'), {
    flag: 'facturas',
    email,
  });
};


WService.prototype.getHorarios = function (actividad, dia) {
  return NetworkHelper.requestPost(this.makeUrl('horarios.php'), {
    flag: 'actividad',
    actividad,
    dia
  });
};

WService.prototype.cargarReserva = function (data) {
  console.log(data)
  return NetworkHelper.requestPost(this.makeUrl('generarReserva.php'), {
    flag: 'reserva',
    estado: 'Pendiente',
    ...data
  });
  
};




WService.prototype.contactus = function (data) {
  return NetworkHelper.requestPost(this.makeUrl('contactus.php'), {
    flag: 'contactus',
    ...data
  });
};


WService.prototype.cargarPuntos = function (data) {
  return NetworkHelper.requestPost(this.makeUrl('canjear.php'), {
    flag: 'puntos',
   ...data
  });
};

WService.prototype.sendAlertasEmail = function (data) {
  return NetworkHelper.requestPost(this.makeUrl('sendAlertasEmail.php'), data);
};

WService.prototype.sendChangeEmail = function (data) {
  return NetworkHelper.requestPost(this.makeUrl('sendChangeEmail.php'), data);
};


WService.prototype.setDelete = function (id) {
  return NetworkHelper.requestPost(this.makeUrl('deleteNotification.php'), {
    flag: 'notificacionborar',
    id,
  });
};

WService.prototype.getProducts = function () {
  return NetworkHelper.requestPost(this.makeUrl('getProducts.php'), {
    flag: 'getProducts',
   
  });
};


export default WService;
