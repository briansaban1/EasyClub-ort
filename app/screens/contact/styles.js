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
  }
});

export default styles;
