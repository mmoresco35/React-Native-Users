
import { combineReducers } from 'redux';
import userReducer from './userReducer';
//combinereducer to allow new reducers to be combined as the application grows
export default combineReducers({
    userReducer,
});