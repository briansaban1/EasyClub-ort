import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor:Colors.background,
    flex:1
  },
  logo: {
    width: 259,
    height: 159,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginTop: 25,
    marginBottom: 10
  },
  welcome: {
    color: Colors.darkblue,
    fontSize: Dimensions.px35,
    fontWeight: 'bold',
    marginLeft: 30

  },
  description: {
    color: Colors.lightblue,
    fontSize: Dimensions.px15,
    marginLeft: 30,
    marginTop: 20,
  },
  createAcc: {
    backgroundColor: Colors.transparent,
    borderWidth: 2,
    borderColor: Colors.border
  },
  hr: {
    width: '90%',
    height: 0.6,
    backgroundColor: '#e3e3e3'
  },
});

export default styles;
