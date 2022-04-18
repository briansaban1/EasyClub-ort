import { StyleSheet, Dimensions } from 'react-native';

const styles =
  StyleSheet.create({
    flexWrapper:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    submissionEmpty:{
      width: Dimensions.get("window").width * 0.75,
      height: Dimensions.get("window").height*0.2,
      alignSelf: 'center',
      marginVertical: 5,
      resizeMode: 'contain',
      
    }
  });

export default styles;
