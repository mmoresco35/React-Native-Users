
import { createStore , applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../reducers';

// store persistence configuration
const persistConfig = {
 key: 'root',
 timeout: 0,
 storage: storage,
 stateReconciler: autoMergeLevel2
};

//persisted reducer generation
const pReducer = persistReducer(persistConfig, rootReducer);
// esport of store and persistor to wrap entire app
export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);