import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';
const right = false;
const left = true;

const styles =
  StyleSheet.create({
    container: {
      backgroundColor: '#ebeff3',
      flex: 1,

    },
    topContainer: {
      backgroundColor: Colors.lightbackground,
    },
    headerIcon: {
      width: 27,
      height: 27,
      resizeMode: 'contain'
    },
    username: {
      fontWeight: '400',
      fontSize: Dimensions.px30,
      color: Colors.darkblue,
    },
    hello: {
      fontWeight: 'bold',
      fontSize: Dimensions.px30,
      color: Colors.darkblue,
      marginVertical: 20,
      marginLeft: 30
    },
    welcome: {
      fontSize: Dimensions.px17,
      marginLeft: 30
    },
    welcome_title: {
      fontSize: Dimensions.px16,
      marginLeft: 30
    },
    tabIcon: {
      width: 27,
      height: 27,
      resizeMode: 'contain'
    },
    tab: {
      flex: 1,
      backgroundColor: '#E7EAF5',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 15,
  
      
      
        //borderTopLeftRadius: right ? 20 : 0,
        //borderTopRightRadius: left ? 0 : 0,
   
      
    },
    bottomBlock: {
      width: '47%',
      height: 140,
      marginBottom: 10,
      borderRadius: 10,
      padding: 10,
      backgroundColor: Colors.white,
    },
    bottomBlockLarge: {
      width: '100%',
      height: 140,
      marginBottom: 10,
      borderRadius: 10,
      padding: 10,
      paddingLeft:15,
      paddingRight:15,
      backgroundColor: Colors.darkblue,
    },
    bottomBlockHr: {
      height: 7,
      width: '100%',
      backgroundColor: '#E2E2E2',
      borderRadius: 4,
      marginVertical:8
    },
    bottomSubBlockHr:{
      height: 7,
      width: '100%',
      backgroundColor: Colors.blue300,
      borderRadius: 4,
    }
  });

export default styles;
