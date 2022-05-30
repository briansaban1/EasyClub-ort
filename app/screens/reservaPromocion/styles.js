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
  subtitle: {
    fontWeight: 'bold',
    color: Colors.blue400,
    fontSize: Dimensions.px15,
    paddingHorizontal: 5,
  },
  subtitleHorario: {
    fontWeight: 'bold',
    color: Colors.darkblue,
    fontSize: Dimensions.px15,
    paddingHorizontal: 5,
  },
  dia: {
    marginTop: 5,
    color: Colors.blue400,
    fontSize: Dimensions.px14,
    paddingHorizontal: 5,
    paddingLeft: 5,
    alignSelf: 'center',
    paddingBottom: 5,
  },
  label: {
    color: Colors.blue400,
    fontSize: Dimensions.px15,
    paddingRight: 15,
  },
  text1: {
    color: Colors.blue400,
    fontSize: Dimensions.px15,
    paddingVertical: 10,
    marginBottom: 5,
    paddingHorizontal: 30,

  },
  dot: {
    fontSize: 10,
    lineHeight: 25,
  },
  buttonCalendar: {

    width: '85%',
    height: 50,
    borderBottomWidth: 3,
    borderColor: '#154DDE',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#F0f6fd',
    marginBottom: 15,
  },
  textDate: {
    textTransform: 'uppercase',
    color: Colors.blue400,
    fontWeight: 'bold',
    fontSize: 14
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderColor: '#DBE3Eb',
    borderBottomWidth: 1,
    paddingBottom: 1,
    //backgroundColor:'#DBE3Eb',
    paddingHorizontal: 20,
    //alignSelf:'center'
  },
  textTime: {
    color: Colors.blue400,
    fontSize: Dimensions.px14,
  },
  selected: {
    borderColor: '#A8B3C8',
    borderWidth: 1,
    //width: '50%',
    borderRadius: 5,
    height: 60,
    //borderStyle: 'dotted',
    //backgroundColor: '#f',
    justifyContent: 'center',
    backgroundColor: '#EBEFF3',
    //shadowOffset:'5',
    //shadowOpacity: '#f'
  },
  FlatList: {
    width: '85%',
    borderColor: '#DBE3Eb',
    borderBottomWidth: 1,
    paddingBottom: 1,
    backgroundColor: '#DBE3Eb',
    paddingHorizontal: 20,
    flexDirection: 'row',
    //justifyContent:'space-between',
    //alignItems:'center',
  },
  pickerContainerStyleIOS: {
    backgroundColor: 'black',
  },
  location: {
    width: 12,
    height: 12,
    marginHorizontal: 10,
    //alignContent:'center',
    alignSelf: 'center'
  },
  title_corto: {
    color: Colors.blue400,
    fontSize: Dimensions.px15,

  },
  oculto: {
    width: 0,
    height: 0
  },
  noOculto: {
    alignItems: 'center',
    color: Colors.blue300,
    width: '90%',
    height: 65,
    borderStyle: 'dotted',
    //backgroundColor: '#fff'
  },
  noSelected: {
    borderColor: '#A8B3C8',
    borderWidth: 1,
    width: '100%',
    borderRadius: 5,
    height: 60,
    borderStyle: 'dotted',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  orden: {
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 10, 
    alignContent: 'space-between', 
    width: '100%'
  }

});

export default styles;