/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { store, persistor } from './store';
import { Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigation';


//React native Application entrance, here are defined de navigation, redux and persist wrappers
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer initialRouteName="List">
              <AppStack/>
            </NavigationContainer>
        </PersistGate>
      </Provider>
  );
};

export default App;