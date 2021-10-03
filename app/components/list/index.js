import React, {useEffect, useState} from 'react';
import {FlatList, View, ActivityIndicator, Dimensions} from 'react-native';
import styles from '../../styles';
import ListItem from '../listItem';
import Button from '../button';
import * as userActions from '../../actions/userActions';
import {useSelector, useDispatch} from 'react-redux';
//list component definition
function List({navigation, route}) {
  // load userreducer state in data variable
  const data = useSelector(state => state.userReducer);
  // define dispatch actions function
  const dispatch = useDispatch();
  //effect to navigate to login if user is not loged (mainly oppening app)
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
  // effect to force refresh users list if navigation params indicates it
  useEffect(() => {
    console.log('params', route.params, data);
    if (data.login != undefined) {
      if (route.params != undefined) {
        if (route.params.refresh) {
          console.log('fetch', data);
          dispatch(userActions.fetchUsers(data.login));
          route.params = undefined;
        }
      }
    }
  }, [route.params, data.login]);
  // method po paint list items
  const paintItem = user => (
    <ListItem 
    item={user.item} 
    navigation={navigation} 
    />
  );
  // action to clean redux data on logout
  function logout() {
    dispatch(userActions.logOut());
  }
  //userlist undefined data protection
  let users = data.users == undefined ? [] : data.users.items;
  return (
    <View>
      <View
        style={styles.row}>
        <Button
          text={'Create'}
          action={() =>
            navigation.navigate('Operator', {user: null, create: true})
          }
        />
        <Button text={'Logout'} action={() => logout()} />
      </View>
      <FlatList
        style={styles.flatlist}
        data={users}
        renderItem={paintItem}
      />
    </View>
  );
}

export default List;
