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
  next: {
    position: 'absolute',
    right: 15,
    bottom: isIphoneX() && 45 || 15
  },
  title: {
    fontSize: Dimensions.px35,
    fontWeight: 'bold',
    color: Colors.darkblue,
    marginLeft: 30,
    marginTop: 50
  },
  notes: {
    margin: 30,
    lineHeight:25,
    fontSize:Dimensions.px15
  },
  terms:{
    textAlign:'center',
    fontSize: Dimensions.px10,
    marginTop:25
  }
});

export default styles;
