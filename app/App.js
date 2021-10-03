/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import List from './components/list'
import Operator from './components/operator'
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { store, persistor } from './store';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Stack = createNativeStackNavigator();
const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  //generamos las capas de redux y persist y pintamos el tablero
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer initialRouteName="List">
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="List" component={List} />
                <Stack.Screen name="Operator" component={Operator} />
              </Stack.Navigator>
            </NavigationContainer>
        </PersistGate>
      </Provider>
  );
};

export default App;