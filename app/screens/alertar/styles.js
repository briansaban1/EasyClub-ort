import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  text: {
    paddingHorizontal: 30,
    lineHeight: 25,

  },
  text1: {
        color: Colors.blue400,
        fontSize: Dimensions.px15,
        paddingVertical: 10,
        marginBottom:5,
        paddingHorizontal: 30,

  },
  dot:{
    fontSize:10,
    lineHeight: 25,
  }
});

export default styles;