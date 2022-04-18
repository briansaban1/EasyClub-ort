import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';
import { isIphoneX } from 'react-native-iphone-x-helper';
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  nextImage: {
    width: 62,
    height: 62
  },
  headerIcon: {
    width: 27,
    height: 27,
    resizeMode: 'contain'
  },
  headerIcon_new: {
    width: 8,
    height: 8,
    resizeMode: 'contain'
  },
  next: {
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0, 
  
  },
  title: {
    fontSize: Dimensions.px35,
    fontWeight: 'bold',
    color: Colors.darkblue,
    marginLeft: 30,
    marginTop: 0,
  },
  notes: {
    margin: 30,
    lineHeight:25,
    fontSize:Dimensions.px15
  },
  notes_texto: {
    marginLeft: 30,
    marginTop: 25,
    lineHeight:25,
    fontSize:Dimensions.px14
  },
  notes1: {
    marginLeft: 30,
    marginRight:25,
    marginTop: 25,
    lineHeight:25,
    fontSize:Dimensions.px15
  },
  terms:{
    textAlign:'center',
    fontSize: Dimensions.px10,
    marginTop:25
  },
  flexContainer1:{
    marginBottom: 15,
  },
  texto:{
      marginBottom:7,
      fontSize:Dimensions.px14,
      color: Colors.lightblue,
  },
  texto_cambio:{
    marginBottom:7,
    fontSize:Dimensions.px14,
    color: Colors.darkblue,

}
});

export default styles;
