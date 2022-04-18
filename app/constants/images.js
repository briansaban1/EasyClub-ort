const Images = {
  Logo: require('@assets/logo.png'),
  Menu: require('@assets/menu.png'),
  Notification: require('@assets/notificaiton.png'),
  Back: require('@assets/back.png'),
  Next: require('@assets/next.png'),
  Activity: require('@assets/activity.png'),
  Shipment: require('@assets/shipment.png'),
  Check: (checked) => checked ? require('@assets/check.png') : require('@assets/uncheck.png'),
  ShowPassword: (show) => show ? require('@assets/opened-eye.png') : require('@assets/closed-eye.png'),
  Tabs: {
    'Home': require('@assets/home.png'),
    'Promociones': require('@assets/offers.png'),
    'Puntos': require('@assets/points.png'),
    'Opciones': require('@assets/options.png'),
  },
  ArrowRight: require('@assets/arrow-right.png'),
  Search: require('@assets/search.png'),
  Voice: require('@assets/voice.png'),
  Close: require('@assets/close.png'),
  submissionEmpty: require('@assets/items-empty.png'),
  PlatformImage: (type) => {
    if (type == 'IOS') return require('@assets/iphone.png')
    if (type == 'ANDROID') return require('@assets/Android.png')
    return require('@assets/Windows.png')
  }

};
export default Images;
