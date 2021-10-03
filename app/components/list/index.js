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
import Button from '../button';
import * as userActions from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux';

const {width, height} = Dimensions.get('window');
function List({navigation, route}) {
  const [modalVisible, setModalVisible] = useState(false);
  //cargamos el estado de redux en una variable con su hook
  const data = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params == undefined) {
      data.login === undefined
        ? navigation.navigate('Operator', {
            user: null,
            login: true,
            register: true,
          })
        : null;
    }
  });
  useEffect(() => {
    console.log('params', route.params, data);
    if (data.login!=undefined){
      if (route.params != undefined) {
        if (route.params.refresh) {
          console.log('fetch', data);
          dispatch(userActions.fetchUsers(data.login));
          route.params = undefined;
        }
      }
    }
  }, [route.params, data.login]);

  function paintLoading() {
    return <ActivityIndicator size="large" />;
  }
  const paintItem = user => (
    //definimos los valores que le pasamos a las casillas  para logica de negocio y pintado
    <ListItem item={user.item} navigation = {navigation} />
  );
  function logout() {
    console.log('logout');
    dispatch(userActions.logOut());
  }
  console.log("reducer ",data);
  let users = data.users == undefined ? [] : data.users.items;
  //Pintamos el tablero y los botones de rolback de movimiento y reinicio de partida
  return (
    <View>
      {data.isFetching ? paintLoading() : null}
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Button
          text={'Create'}
          action={() =>
            navigation.navigate('Operator', {user: null, create: true})
          }
        />
        <Button text={'Logout'} action={() => logout()} />
      </View>
      <FlatList
        style={{
          
          margin:'2%'
        }}
        data={users}
        renderItem={paintItem}
      />
    </View>
  );
}

export default List;
