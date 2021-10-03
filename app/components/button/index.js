import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from '../../styles';
// widget to make all buttons get same style
function Button(props) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.action}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
