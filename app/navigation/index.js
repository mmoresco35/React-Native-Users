import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import List from '../components/list'
import Operator from '../components/operator'

//definition of stack application navigation, app uses 2 containers to allow all functionality
const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Operator" component={Operator} />
    </Stack.Navigator>
  );
}

export default AppStack;
