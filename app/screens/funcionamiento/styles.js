import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius:10,
  },
  mainContainer:{
    paddingHorizontal: 20,
    marginBottom:10,
    marginTop:10,
  },
  text15: {
    fontSize: Dimensions.px15,
    color: Colors.blue400,
    width: '100%',
    padding:5,
    marginTop:5,
    marginBottom: 7,
    height: 'auto',
  },
text16: {
  fontSize: Dimensions.px16,
  color: "#223E6D",
  width: '100%',
  padding:5,
  fontWeight: 'bold',
  marginBottom: 5,

},
text161: {
  fontSize: Dimensions.px15,
  color: Colors.blue400,
  fontWeight: 'bold',
  
  },
  text171: {
    fontSize: Dimensions.px15,
    color: Colors.blue400,
    
},

sub_bg: {
  backgroundColor:'#fff',
  width: "100%",
  borderRadius:10,
  padding: 10
 
},
});

export default styles;
