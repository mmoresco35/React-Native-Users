import React from 'react';
import {
    TouchableOpacity,
    Text,
    Dimensions
  } from 'react-native';
import styles from '../../styles'
// definition of widget to paint list items, on click navigates to operator view to edit/delete item
function ListItem (props) {
    return (
      <TouchableOpacity style={styles.listItem}
      onPress = {()=> props.navigation.navigate('Operator', {user: props.item})}
      >
        <Text>Email : {props.item.email}</Text>
        <Text>Nombre : {props.item.name}</Text>
        <Text>Apellidos : {props.item.surname}</Text>
      </TouchableOpacity>
    );
} 
export default ListItem;