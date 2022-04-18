import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  header: {
    paddingHorizontal: 30,
    marginBottom:10,
    marginTop:10,
  },
  headerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  mainInfo: {
    width: Dimensions.deviceWidth - 60,
    paddingLeft: 13,
    alignItems: 'flex-start',
    
  },
  mainInfo1: {
    width: Dimensions.deviceWidth - 60,
    //paddingLeft: 15,
    alignItems: 'flex-start',
    
  },

  title: {
    color: Colors.darkblue,
    fontWeight: 'bold',
    marginLeft: 30,
    fontSize: 25
  },
  fondo:{
    //backgroundColor: "#fff",
    marginTop: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  fondo_up:{
   backgroundColor: "#fff",
   borderRadius: 10,
   padding: 10,
   width: Dimensions.deviceWidth - 30 ,
   alignSelf: 'center',
   alignItems: 'center',
   justifyContent: 'center',
   borderColor: '#707070',
   //borderWidth:0.2,
  },
  modal: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040'
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
    color: colors.blue400,
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
  height: 50,
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
}
});

export default styles;
