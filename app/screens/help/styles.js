import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  notes: {
    margin: 30,
    lineHeight:25,
    fontSize:Dimensions.px15
  },

});

export default styles;
