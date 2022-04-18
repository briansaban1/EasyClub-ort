import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  item: {
    backgroundColor: Colors.white,
    marginHorizontal: 30,
    marginBottom: 12,
    borderRadius: 5,
    padding:20,
    flexDirection:'row',
    alignItems:'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2,  },
    elevation: 0,
    shadowRadius: 1,

  },
  platform: {
    marginTop: 5
  },
  actividad:{
    fontWeight: '600',
  },
  image:{
    height:30,
    width:30,
    resizeMode:'contain',
    marginRight:10
  }
});

export default styles;
