import {
  FETCHING_USER,
  FETCHING_USERS_SUCCESS,
  FETCHING_USERS_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  LOG_USER_SUCCESS,
  LOG_USER_FAILURE,
  LOG_OUT,
} from '../constants';

//initial reducer state
const initialState = {
  users: undefined,
  login: undefined,
  isFeching: false,
};
//definition od reducer state changes responding to defined actions
export default userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER:
      return {
        ...state,
        isFeching: true,
      };
    case LOG_USER_SUCCESS:
      return {
        ...state,
        login: action.data,
        isFeching: false,
      };
    case LOG_USER_FAILURE:
      return {
        ...state,
        isFeching: false,
      };
    case FETCHING_USERS_SUCCESS:
      return {
        ...state,
        users: action.data,
        isFeching: false,
      };
    case FETCHING_USERS_FAILURE:
      return {
        ...state,
        isFeching: false,
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        isFeching: false,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        isFeching: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFeching: false,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        isFeching: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        isFeching: false,
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        isFeching: false,
      };

    case LOG_OUT:
      return {
        ...state,
        login: undefined,
      };
    default:
      return state;
  }
};
