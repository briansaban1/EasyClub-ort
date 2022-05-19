import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: 30,
    paddingBottom: 50,
},
title: {
    fontWeight: 'bold',
    fontSize: Dimensions.px18,
    color: Colors.darkblue
},
label: {
    width: '30%',
    fontSize: Dimensions.px15
},
right: {
    width: '70%',
},
close: {
    width: 15,
    height: 15,
    margin: 15,
},
list: {
    flex: 1,
    marginTop: 20,
},
mitad: {
    width: '50%',
    fontSize: Dimensions.px15
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
text2: {
  color: Colors.blue400,
  fontSize: Dimensions.px15,
  paddingVertical: 10,
  marginBottom:5,
  paddingHorizontal: 30,

},
});

export default styles;
