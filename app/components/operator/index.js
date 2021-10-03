import React, {useState} from 'react';
import {View, TextInput, Alert, Text, TouchableOpacity} from 'react-native';
import Button from '../button';
import * as userActions from '../../actions/userActions';
import {useDispatch, useSelector} from 'react-redux';

//pintado de las casillas
function Operator(props) {
  console.log('operator', props);
  let params = props.route.params;
  const data = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(params.user?params.user.email:'');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(params.user?params.user.name:'');
  const [surname, setSurname] = useState(params.user?params.user.surname:'');
  const [id, setId] = useState(params.user?params.user.id:'');
  const [selected, setselected] = useState('login');
  function login(login) {
    if (login.email===""|| login.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
        dispatch(
            userActions.loginUser(login),
          );
          props.navigation.navigate('List', {refresh: true});
    }
    
  }
  function register(user) {
    if (user.email===""|| user.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
    dispatch(
      userActions.registerUser(user),
    );
    setselected("login");
    }
  }
  function update(user) {
    if (user.email===""|| user.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
    dispatch(
      userActions.putUser(user, data.login),
    );
    props.navigation.navigate('List', {refresh: true});
    }
  }
  function del(user) {
    dispatch(
      userActions.deleteUser(user, data.login),
    );
    props.navigation.navigate('List', {refresh: true});
  }
  function create(user) {
    if (user.email===""|| user.password===""){
        Alert.alert("datos incorrectos", "el email y la contraseña son campos obligatorios")
    }else{
    dispatch(
      userActions.postUser(user, data.login),
    );
    props.navigation.navigate('List', {refresh: true});
    }
  }
  function goBack() {
    props.navigation.navigate('List');
  }

  function paintHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 'auto',
        }}>
        <TouchableOpacity
          style={[{
            flex:1,
            borderColor: 'black',
            borderWidth: 1,
            padding: '2%',
          },{
              backgroundColor:(selected=="login")?"grey":null
              }]}
          onPress={() => setselected("login")}>
          <Text style={{textAlign:'center'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[{
              flex:1,
            borderColor: 'black',
            borderWidth: 1,
            padding: '2%',
          },{
            backgroundColor:(selected=="register")?"grey":null
          }]}
          onPress={() => setselected("register")}>
          <Text style={{textAlign:'center'}}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
  function paintLogin() {
    return (
      <View>
        <Text>Email:</Text>
        <TextInput
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            margin: '2%',
          }}
          keyboardType='email-address'
          onChangeText={value => setEmail(value)}
          value={email}
        />
        <Text>password</Text>
        <TextInput
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            margin: '2%',
          }}
          secureTextEntry={true}
          onChangeText={value => setPassword(value)}
          value={password}
        />
      </View>
    );
  }
  function paintAditionalData() {
    return (
      <View>
        <Text>Nombre: </Text>
        <TextInput
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            margin: '2%',
          }}
          onChangeText={value => setName(value)}
          value={name}
        />
        <Text>Apellidos: </Text>
        <TextInput
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
            margin: '2%',
          }}
          onChangeText={value => setSurname(value)}
          value={surname}
        />
      </View>
    );
  }
  function paintbuttons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginTop: 'auto',
          padding: '5%',
        }}>
        {params.login && selected==="login" ? setbutton('login') : null}
        {(params.login && selected==="register")?setbutton('Register') : null}
        {params.user ? setbutton('update') : null}
        {params.user ? setbutton('delete') : null}
        {params.create ? setbutton('create') : null}
        {!params.login ?setbutton('back'):null}
      </View>
    );
  }
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
  console.log(params);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#9A9A9A80',
      }}>
      <View
        style={{
          margin: '10%',
          backgroundColor: 'white',
        }}>
        {params.login ? paintHeader() : null}
        {paintLogin()}
        {(!params.login || selected==="register")? paintAditionalData() : null}
        {paintbuttons()}
      </View>
    </View>
  );
}

export default Operator;
