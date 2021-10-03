import React, {useState} from 'react';
import {View, TextInput, Alert, Text, TouchableOpacity} from 'react-native';
import Button from '../button';
import * as userActions from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../styles';

// ccontainer that allows to perform all actions on users
function Operator(props) {
    //route params capture
  let params = props.route.params;
  // redux state capture to data constant
  const data = useSelector(state => state.userReducer);
  //action hook definition
  const dispatch = useDispatch();
    // state variables hook definition
  const [email, setEmail] = useState(params.user?params.user.email:'');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(params.user?params.user.name:'');
  const [surname, setSurname] = useState(params.user?params.user.surname:'');
  const [id, setId] = useState(params.user?params.user.id:'');
  const [selected, setselected] = useState('login');
  // login button action definition
  function login(login) {
      // minimal values validation
    if (login.email===""|| login.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
        //login action dispatch
        dispatch(
            userActions.loginUser(login),
          );
          //navigation to list after login
          props.navigation.navigate('List', {refresh: true});
    }
  }
  // register button action
  function register(user) {
      // minimal values validation
    if (user.email===""|| user.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
        //action dispatch
    dispatch(
      userActions.registerUser(user),
    );
    //selected value change
    setselected("login");
    }
  }
  //update button action 
  function update(user) {
      // minimal values validation
    if (user.email===""|| user.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
        // action dispatch
    dispatch(
      userActions.putUser(user, data.login),
    );
    //navigate to list after action
    props.navigation.navigate('List', {refresh: true});
    }
  }
  //delete button action
  function del(user) {
      //action dispatch
    dispatch(
      userActions.deleteUser(user, data.login),
    );
    // navigate to lost
    props.navigation.navigate('List', {refresh: true});
  }
  // create button action
  function create(user) {
      // minimal values validation
    if (user.email===""|| user.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
        //action dispatch
    dispatch(
      userActions.postUser(user, data.login),
    );
    //navigate to list
    props.navigation.navigate('List', {refresh: true});
    }
  }
  //go back button action
  function goBack() {
      //navigate to list
    props.navigation.navigate('List');
  }
  // function to create header login/register for not logged operations
  function paintHeader() {
    return (
      <View
        style={styles.header}>
        <TouchableOpacity
          style={[styles.headerButton,{
              backgroundColor:(selected=="login")?"grey":null
              }]}
          onPress={() => setselected("login")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerButton,{
            backgroundColor:(selected=="register")?"grey":null
          }]}
          onPress={() => setselected("register")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //function to show login minimal data fields
  function paintLogin() {
    return (
      <View>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <Text>password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
        />
      </View>
    );
  }
  // function to show aditional user data fields
  function paintAditionalData() {
    return (
      <View>
        <Text>Nombre: </Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setName(value)}
          value={name}
        />
        <Text>Apellidos: </Text>
        <TextInput
          style={styles.input}
          onChangeText={value => setSurname(value)}
          value={surname}
        />
      </View>
    );
  }//function to show the buttons based on the parameters received in route 
  function paintbuttons() {
    return (
      <View
        style={styles.buttonRow}>
        {params.login && selected==="login" ? setbutton('login') : null}
        {(params.login && selected==="register")?setbutton('Register') : null}
        {params.user ? setbutton('update') : null}
        {params.user ? setbutton('delete') : null}
        {params.create ? setbutton('create') : null}
        {!params.login ?setbutton('back'):null}
      </View>
    );
  }
  //function to define button values for each button type
  function setbutton(action) {
    let user = {name:name, surname:surname,id:id ,email:email, password:password}
    switch (action) {
      case 'Register':
        return <Button text="Registrar" action={() => register(user)} />;
        case 'login':
        return <Button text="Login" action={() => login(user)} />;
      case 'update':
        return <Button text="Actualizar" action={() => update(user)} />;
      case 'delete':
        return <Button text="Borrar" action={() => del(user)} />;
      case 'create':
        return <Button text="Crear" action={() => create(user)} />;
        case 'back':
        return <Button text="Atras" action={() => goBack()} />;
    }
  }
  return (
    <View
      style={styles.operatorBackground}>
      <View
        style={styles.operatorBox}>
        {params.login ? paintHeader() : null}
        {paintLogin()}
        {(!params.login || selected==="register")? paintAditionalData() : null}
        {paintbuttons()}
      </View>
    </View>
  );
}

export default Operator;
