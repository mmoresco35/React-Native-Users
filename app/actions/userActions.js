import * as constants from '../constants';
import * as api from '../api/endpoints/users';
import {Alert} from 'react-native';

function showAlert(title, message) {
  Alert.alert(title, message, [
    {text: 'Aceptar', onPress: () => console.log('Aceptar Pressed')},
  ]);
}

export const loadingUser = () => {
  return {type: constants.FETCHING_USER};
};

export const getUsersSuccess = data => {
  return {type: constants.FETCHING_USERS_SUCCESS, data};
};

export const getUsersFailure = data => {
  return {type: constants.FETCHING_USERS_FAILURE, data};
};

export const logOut = () => {
  return {type: constants.LOG_OUT};
};

export const logUserSuccess = data => {
  return {type: constants.LOG_USER_SUCCESS, data};
};

export const logUserFailure = data => {
  return {type: constants.LOG_USER_FAILURE, data};
};
export const createUserSuccess = () => {
  return {type: constants.CREATE_USER_SUCCESS};
};

export const createUserFailure = () => {
  return {type: constants.CREATE_USER_FAILURE};
};
export const updateUserSuccess = () => {
  return {type: constants.UPDATE_USER_SUCCESS};
};

export const updateUserFailure = () => {
  return {type: constants.UPDATE_USER_FAILURE};
};
export const deleteUserSuccess = () => {
  return {type: constants.DELETE_USER_SUCCESS};
};

export const deleteUserFailure = () => {
  return {type: constants.DELETE_USER_FAILURE};
};

export const fetchUsers = login => {
  return dispatch => {
    //lanzamos accion de inicio de carga
    dispatch(loadingUser());
    //lanzamos llamada API
    api
      .fetchUsers(login)
      .then(([response, json]) => {
        //si la respuesta es correcta
        if (response.status > 199&&response.status< 300) {
          dispatch(getUsersSuccess(json));
          //si no es correcta
        } else {
          showAlert(
            'Error Recuperando datos de usuarios',
            'se ha producido un error en la recuperacion de datos de usuarios, vuelva a intentar la operativa mas tarde',
          );
          dispatch(getUsersFailure(json));
        }
      })
      //caso de error
      .catch(error => {
        showAlert(
          'Error Recuperando datos de usuarios',
          'se ha producido un error en la recuperacion de datos de usuarios, vuelva a intentar la operativa mas tarde',
        );
        dispatch(getUsersFailure(error));
      });
  };
};

export const loginUser = login => {
  return dispatch => {
    //lanzamos accion de inicio de login
    dispatch(loadingUser());
    //lanzamos llamada API
    api
      .logUser(login)
      .then(([response, json]) => {
        //si la respuesta es correcta
        if (response.status > 199&&response.status< 300) {
          showAlert('Login Correcto', '');
          dispatch(logUserSuccess(json));
          //si no es correcta
        } else {
          showAlert(
            'Error en login',
            'se ha producido un error en el proceso de login, vuelva a intentar la operativa mas tarde',
          );
          dispatch(logUserFailure(json));
        }
      })
      //caso de error
      .catch(error => {
        showAlert(
          'Error en login',
          'se ha producido un error en el proceso de login, vuelva a intentar la operativa mas tarde',
        );
        dispatch(logUserFailure(error));
      });
  };
};

export const postUser = (user, login) => {
  return dispatch => {
    //lanzamos accion de inicio de creacion
    dispatch(loadingUser());
    //lanzamos llamada API
    api
      .createUser(user, login)
      .then(([response, json]) => {
        //si la respuesta es correcta
        if (response.status > 199&&response.status< 300) {
          showAlert('Usuario creado Correctamente', '');
          dispatch(fetchUsers(login))
          dispatch(createUserSuccess());
          //si no es correcta
        } else {
          showAlert(
            'Error en creacion de usuario',
            'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
          );
          dispatch(createUserFailure());
        }
      })
      //caso de error
      .catch(error => {
        showAlert(
          'Error en creacion de usuario',
          'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
        );
        dispatch(createUserFailure());
      });
  };
};

export const registerUser = (user) => {
    return dispatch => {
      //lanzamos accion de inicio de creacion
      dispatch(loadingUser());
      //lanzamos llamada API
      api
        .signUser(user)
        .then(([response]) => {
          //si la respuesta es correcta
          if (response.status > 199&&response.status< 300) {
            dispatch(createUserSuccess());
            //si no es correcta
          } else {
            dispatch(createUserFailure());
          }
        })
        //caso de error
        .catch(error => {
          dispatch(createUserFailure());
        });
    };
  };

export const putUser = (user, login) => {
  return dispatch => {
    //lanzamos accion de inicio de creacion
    dispatch(loadingUser());
    //lanzamos llamada API
    api
      .updateUser(user, login)
      .then(([response, json]) => {
        //si la respuesta es correcta
        if (response.status > 199&&response.status< 300) {
          showAlert('Usuario editado Correctamente', '');
          dispatch(fetchUsers(login))
          dispatch(updateUserSuccess());
          //si no es correcta
        } else {
          showAlert(
            'Error en edicion de usuario',
            'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
          );
          dispatch(updateUserFailure());
        }
      })
      //caso de error
      .catch(error => {
        showAlert(
          'Error en edicion de usuario',
          'se ha producido un error en el proceso, vuelva a intentar la operativa mas tarde',
        );
        dispatch(updateUserFailure());
      });
  };
};

export const deleteUser = (user, login) => {
  return dispatch => {
    //lanzamos accion de inicio de login
    dispatch(loadingUser());
    //lanzamos llamada API de login para iniciar el proceso
    api
      .delUser(user, login)
      .then(([response, json]) => {
          console.log ("respuesta", response)
        //si la respuesta es correcta
        if (response.status > 199 && response.status< 300) {
          showAlert('Usuario borrado Correctamente', '');
          dispatch(fetchUsers(login))
          dispatch(deleteUserSuccess());
          //si no es correcta
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
