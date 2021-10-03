import * as constants from '../constants';
import * as api from '../api/endpoints/users';
import {Alert} from 'react-native';
// Alert definition to show user action result
function showAlert(title, message) {
  Alert.alert(title, message, [
    {text: 'Aceptar', onPress: () => console.log('Aceptar Pressed')},
  ]);
}
//simple actions (direct action feed to reducer)
// acction to put reducer in loading status
export const loadingUser = () => {
  return {type: constants.FETCHING_USER};
};
// action to send reducer fetch users result
export const getUsersSuccess = data => {
  return {type: constants.FETCHING_USERS_SUCCESS, data};
};
// action to send reducer fetch users result (fail case)
export const getUsersFailure = data => {
  return {type: constants.FETCHING_USERS_FAILURE, data};
};
// action to send reducer user logout
export const logOut = () => {
  return {type: constants.LOG_OUT};
};
// action to send reducer login users result
export const logUserSuccess = data => {
  return {type: constants.LOG_USER_SUCCESS, data};
};
// action to send reducer fetch users result (fail case)
export const logUserFailure = data => {
  return {type: constants.LOG_USER_FAILURE, data};
};
// action to send reducer create user result
export const createUserSuccess = () => {
  return {type: constants.CREATE_USER_SUCCESS};
};
// action to send reducer create user result (fail case)
export const createUserFailure = () => {
  return {type: constants.CREATE_USER_FAILURE};
};
// action to send reducer update user result
export const updateUserSuccess = () => {
  return {type: constants.UPDATE_USER_SUCCESS};
};
// action to send reducer update users result (fail case)
export const updateUserFailure = () => {
  return {type: constants.UPDATE_USER_FAILURE};
};
// action to send reducer delete users result
export const deleteUserSuccess = () => {
  return {type: constants.DELETE_USER_SUCCESS};
};
// action to send reducer delete users result (fail case)
export const deleteUserFailure = () => {
  return {type: constants.DELETE_USER_FAILURE};
};
// complex actions definitions (multiple action dispatchs)
// API ferch users process action definition
export const fetchUsers = login => {
  return dispatch => {
    dispatch(loadingUser());
    api
      .fetchUsers(login)
      .then(([response, json]) => {
        if (response.status > 199&&response.status< 300) {
          dispatch(getUsersSuccess(json));
        } else {
          showAlert(
            'Error Recuperando datos de usuarios',
            'se ha producido un error en la recuperacion de datos de usuarios, vuelva a intentar la operativa mas tarde',
          );
          dispatch(getUsersFailure(json));
        }
      })
      .catch(error => {
        showAlert(
          'Error Recuperando datos de usuarios',
          'se ha producido un error en la recuperacion de datos de usuarios, vuelva a intentar la operativa mas tarde',
        );
        dispatch(getUsersFailure(error));
      });
  };
};
// API login process action definition
export const loginUser = login => {
  return dispatch => {
    dispatch(loadingUser());
    api
      .logUser(login)
      .then(([response, json]) => {
        if (response.status ==200) {
          showAlert('Login Correcto', '');
          dispatch(logUserSuccess(json));
        } else {
          showAlert(
            'Error en login',
            'se ha producido un error en el proceso de login, vuelva a intentar la operativa mas tarde',
          );
          dispatch(logUserFailure(json));
        }
      })
      .catch(error => {
        showAlert(
          'Error en login',
          'se ha producido un error en el proceso de login, vuelva a intentar la operativa mas tarde',
        );
        dispatch(logUserFailure(error));
      });
  };
};
// API user creation process action definition
export const postUser = (user, login) => {
  return dispatch => {
    dispatch(loadingUser());
    api
      .createUser(user, login)
      .then(([response, json]) => {
        if (response.status ==201) {
          showAlert('Usuario creado Correctamente', '');
          dispatch(fetchUsers(login))
          dispatch(createUserSuccess());
        } else {
          showAlert(
            'Error en creacion de usuario',
            'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
          );
          dispatch(createUserFailure());
        }
      })
      .catch(error => {
        showAlert(
          'Error en creacion de usuario',
          'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
        );
        dispatch(createUserFailure());
      });
  };
};
// API register user process action definition
export const registerUser = (user) => {
    return dispatch => {
      dispatch(loadingUser());
      api
        .signUser(user)
        .then(([response]) => {
          if (response.status==204) {
            dispatch(createUserSuccess());
          } else {
            dispatch(createUserFailure());
          }
        })
        .catch(error => {
          dispatch(createUserFailure());
        });
    };
  };
// API update user process action definition
export const putUser = (user, login) => {
  return dispatch => {
    dispatch(loadingUser());
    api
      .updateUser(user, login)
      .then(([response, json]) => {
        if (response.status ==200) {
          showAlert('Usuario editado Correctamente', '');
          dispatch(fetchUsers(login))
          dispatch(updateUserSuccess());
        } else {
          showAlert(
            'Error en edicion de usuario',
            'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
          );
          dispatch(updateUserFailure());
        }
      })
      .catch(error => {
        showAlert(
          'Error en edicion de usuario',
          'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
        );
        dispatch(updateUserFailure());
      });
  };
};
// API delete user process action definition
export const deleteUser = (user, login) => {
  return dispatch => {
    dispatch(loadingUser());
    api
      .delUser(user, login)
      .then(([response, json]) => {
          console.log ("respuesta", response)
        if (response.status ==204) {
          showAlert('Usuario borrado Correctamente', '');
          dispatch(fetchUsers(login))
          dispatch(deleteUserSuccess());
        } else {
          showAlert(
            'Error en borrado de usuario',
            'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
          );
          dispatch(deleteUserFailure());
        }
      })
      .catch(error => {
        console.log ("respuesta", response)
        showAlert(
          'Error en borrado de usuario',
          'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
        );
        dispatch(deleteUserFailure());
      });
  };
};
