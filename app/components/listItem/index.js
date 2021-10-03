import React ,{ useState }from 'react';
import {
    Alert,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    Modal,
    useColorScheme,
    View,
    Dimensions
  } from 'react-native';
import * as constants from '../../constants'
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as userActions from '../../actions/userActions';
import { useSelector, useDispatch} from 'react-redux';


const { width, height } = Dimensions.get('window');
function ListItem (props) {
  console.log ("listitem",props)

    return (
      <TouchableOpacity style={{
        margin:'2%',
        padding:'2%',
        backgroundColor: 'white',   
      }}
      onPress = {()=> props.navigation.navigate('Operator', {user: props.item})}
      >
        <Text>Email : {props.item.email}</Text>
        <Text>Nombre : {props.item.name}</Text>
        <Text>Apellidos : {props.item.surname}</Text>
      </TouchableOpacity>
    );
}
// estilos de la aplicacion
const styles = StyleSheet.create({
  board:{
    flexDirection:"row",
    width:width,
    height:width,
  },  
  squareText:{
    fontSize:width/6
  },
  row:{
    flexDirection:"row",
    marginTop:25
  },
  button:{
    width: (width/2)-10,
    padding: 10,
    borderWidth:2,
    borderRadius:5,
    margin: 5,
    justifyContent:"center",
  },
  buttonText:{
    textAlign: 'center',
  },
  title:{}
  });

export default ListItem;