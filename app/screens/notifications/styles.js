import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1
  },
  item: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 5,
    padding:20,
    flexDirection:'row',
    //alignItems:'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2,  },
    elevation: 0,
    shadowRadius: 1,
    minHeight: 80,
  },
  platform: {
    marginTop: 5,
    fontWeight: '500',
  },
  fecha: {
    marginTop: 7,
    fontWeight: '200',
    fontSize:12,
    alignContent:'flex-end',
    alignSelf:'flex-start',
    
  },
  image:{
    width: 12,
        height: 12,
        resizeMode: 'contain',
        margin: 12,
        
  }
});

export default styles;
