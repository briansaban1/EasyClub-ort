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
  },
  buttonCalendar:{
   
    width:'85%',
    height:50,
    borderBottomWidth:3,
    borderColor:'#154DDE',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingHorizontal:15,
    borderRadius:5,
    backgroundColor:'#F0f6fd',
    marginBottom:15,
  },
  textDate:{
    textTransform:'uppercase',
    color: Colors.blue400,
    fontWeight:'bold',
    fontSize:14
  },
  timeContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    height:50,
    borderColor:'#DBE3Eb',
    borderBottomWidth:1,
    paddingBottom:1,
    //backgroundColor:'#DBE3Eb',
    paddingHorizontal:20,
    //alignSelf:'center'
  },
  textTime:{
   color:Colors.blue400,
   fontSize: Dimensions.px14,
  },
  selected:{
                               borderColor: '#A8B3C8',
                                borderWidth: 1,
                                //width: '50%',
                                borderRadius: 5,
                                height: 60,
                                //borderStyle: 'dotted',
                                //backgroundColor: '#f',
                                justifyContent: 'center',
                                backgroundColor: '#fffa',
                                //shadowOffset:'5',
                                //shadowOpacity: '#f'
  },
  FlatList:{
    width:'85%',
    borderColor:'#DBE3Eb',
    borderBottomWidth:1,
    paddingBottom:1,
    backgroundColor:'#DBE3Eb',
    paddingHorizontal:20,
    flexDirection:'row',
    //justifyContent:'space-between',
    //alignItems:'center',
  },
  pickerContainerStyleIOS: {
    backgroundColor: 'black',
}
});

export default styles;