import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import ListItem from '../listItem';
import * as userActions from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux';

function Button( props) {
    console.log ("button",props)
    return (
      
    <TouchableOpacity
      style={{flex: 1, backgroundColor: 'white', padding: '2%', margin: '2%'}}
      onPress={props.action}>
      <Text style={{textAlign: 'center'}}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
