import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  containerData: {
    borderColor: '#70707040',
    width: Dimensions.deviceWidth - 60,
    marginBottom: 5,
    marginTop: 5,
    alignItems: "center",
    justifyContent: 'space-between',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    borderWidth: 1,
    alignSelf: 'center',
    backgroundColor: Colors.white
},
mainContainer: {
    width: Dimensions.deviceWidth - 210,
},
location: {
    width: 40,
    height: 40,
    marginHorizontal: 10
},
icon: {
    width: 15,
    height: 15,
    resizeMode: 'contain',
    margin: 10
},
modal: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040',

},
modalContainer: {
    width: '70%',
    minHeight: 270,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
title1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.blue400,
    marginBottom: 10,

    marginTop: 20,
},
hr: {
    width: '85%',
    height: 0.6,
    backgroundColor: '#e3e3e3'
},
flexContainer1: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 13,
    width: '85%'
},
button1: {
    height: 45,
    borderRadius: 10,
    width: Dimensions.deviceWidth - 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    marginTop: 10,
    marginBottom: 20
},
text1: {
    color: Colors.white,
    fontSize: Dimensions.px16,
    fontWeight: 'bold'
},
texto:{
   color: Colors.blue400,
   fontSize: Dimensions.px15,
   fontWeight: 'bold'
},
iconos:{
    paddingRight:20
}

});

export default styles;
