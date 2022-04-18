import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  social: {
    width: 32,
    height: 32,
    marginHorizontal:15,
    marginVertical:30
  },
  card:{
    borderRadius:10,
    marginHorizontal:30,
    backgroundColor: Colors.white,
  },
  menuButton: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius:10,
  },
  answer:{
    backgroundColor: Colors.background,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor:Colors.border,
    borderWidth:1
  },
  title: {
    color: Colors.darkblue,
    fontWeight: 'bold',
    marginTop: 15,
    //marginLeft: 30,
    fontSize: 25,
  },
  title_corto: {
    color: Colors.lightblue,
    fontWeight: 'bold',
    marginTop: 10,
    //marginLeft: 30,
    fontSize: 15,
  },
  title1: {
    color: Colors.blue400,
    fontWeight: '500',
    marginTop: 15,
    //marginLeft: 30,
    fontSize: 15,
    textAlign:'justify'
  },
  fondo:{
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 10,
    margin: 15,
    marginBottom:5,
  },
  fondo_new:{
    backgroundColor: "#fff",
    marginTop: 5,
    borderRadius: 10,
    margin: 15,
    marginBottom:5,
  },
  profile_text: {
    fontWeight: 'bold',
    fontSize: Dimensions.px16,
    color: Colors.darkblue,
    marginVertical: 4,
    marginLeft: 0
  },
  profile_text_v: {
    fontWeight: 'bold',
    fontSize: Dimensions.px15,
    color: Colors.lightblue,
    marginVertical: 4,
    marginLeft: 0,
    marginLeft: 5,
  },
  sidebar_nav_icon: {
    width: 15,
    height: 15,
    marginLeft: 7,
    marginTop:5
},
item_icon: {
  width: 50,
  height: 50,
  marginLeft: 20,
  marginRight:10,
  justifyContent: 'center', 
  alignItems: 'center',
  textAlignVertical: 'center',
  alignContent: 'center'
},
data_container: { 
  width: "100%",
  padding: 15,
  
},
item: {
  color: "#3D4956",
  width: '80%',
  marginTop: 5,
  marginBottom: 0,
  flexDirection: 'row',
},
mainContainer1: {
      width: '95%',
      backgroundColor: '#ffffff',
      marginTop: 5,
      alignItems: 'center',
      borderRadius: 20,
      marginBottom: 10,

},
percentText:{
  fontSize:15,
  paddingTop:0,
  paddingLeft: 125,
  color: Colors.darkblue,
  marginBottom: 7,
  textAlign: 'right',
  fontWeight:'500',
  marginTop:0,
},
createAcc: {
  backgroundColor: Colors.transparent,
  borderWidth: 2,
  borderColor: Colors.border
},
imagen_puntos: {
  width: 250,
  height: 47,
  marginLeft: 20,
  marginRight:10,
  marginTop:20,
  justifyContent: 'center', 
  alignItems: 'center',
  textAlignVertical: 'center',
  alignContent: 'center'
},
text15: {
  fontSize: Dimensions.px15,
  color: Colors.blue400,
  marginBottom: 0,
  marginTop: 15,
  textAlign:'justify'
},
text152: {
  fontSize: Dimensions.px15,
  color: Colors.blue400,
  marginBottom: 5,
  marginTop: 15,
  textAlign:'justify'
},
text13: {
  fontSize: Dimensions.px13,
  color: Colors.darkblue,
  marginTop:10,
  marginBottom: 7,
  marginTop: 15,
  textAlign:'justify'
},
text13_: {
  fontSize: Dimensions.px14,
  color: Colors.darkblue,
  marginTop:10,
  marginBottom: 0,
  marginTop: 18,
},
hr: {
  width: '90%',
  height: 0.6,
  backgroundColor: '#e3e3e3',
  alignSelf:'center',
  marginTop:15,
},
button1: {
  height: 45,
  borderRadius: 7,
  width: Dimensions.deviceWidth - 150,
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: Colors.darkblue,
  marginTop: 15,
  marginBottom: 5
},
buttonText1: {
  color: Colors.white,
  fontSize: Dimensions.px16,
  fontWeight: 'bold'
 },

});


export default styles;
