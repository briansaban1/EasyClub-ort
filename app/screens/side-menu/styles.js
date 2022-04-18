import { StyleSheet } from 'react-native';
import { Colors, Dimensions } from '../../constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f6f7f9',
    flex: 1
  },
  username: {
    fontWeight: 'bold',
    fontSize: Dimensions.px30,
    color: Colors.darkblue,
  },
  card: {
    borderRadius: 10,
    borderColor: Colors.border,
    borderWidth: 1,
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop:30,
    backgroundColor: '#fff'
  },
  menuButton: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  subLabel: {
    marginLeft: 20,
    color: Colors.darkblue,
    marginBottom: 20
  }
});

export default styles;
