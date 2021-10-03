import * as constants from '../../constants';
import { useSelector, useDispatch} from 'react-redux';
const  BASEURL= constants.DEV_URL?constants.API_URL_DEV:constants.API_URL

export const logUser = (login) => {
    let url = constants.API_URL+constants.API_LOGIN
    return fetch(url, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login)
    }).then(Response => {
        json = Response.json()
        if (constants.PAINT_URL){
            console.log ("log login => ",url, JSON.stringify(login), Response)
        }
        return Promise.all([Response, json]);
    });
};

export const signUser = (user) => {
    let url = constants.API_URL+constants.API_SIGNUP
    console.log (url, JSON.stringify(user))
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(Response => {
        if (constants.PAINT_URL){
            console.log ("register => ",url)
        }
        return Promise.all([Response]);
    });
};


export const fetchUsers = (login) => {
    let bearer = login.tokenType+' '+login.accessToken
    let url = constants.API_URL+constants.API_USERS
    //hacemos llamada con fecth y recibimos el resultado asincrono en el then
    return fetch(url, {
        method: 'GET',
        headers: {
            Authorization: bearer,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }})
        .then(Response => {
            json = Response.json();
            if (constants.PAINT_URL){
                console.log ("fetch user => ",url, Response)
            }
            return Promise.all([Response, json]);
        });
};



export const createUser = (user, login) => {
    let bearer = login.tokenType+' '+login.accessToken
    let url = constants.API_URL+constants.API_USERS
    //hacemos llamada con fecth y recibimos el resultado asincrono en el then
    return fetch(url, {
        method: 'POST',
        headers: {
            Authorization: bearer,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(Response => {
            json = Response.json()
            if (constants.PAINT_URL){
                console.log ("create => ",url, JSON.stringify(user), Response)
            }
            //retornamos la llamada , el parseo del contenido a json y los datos del user
            return Promise.all([Response, json, user]);
        });
};

export const updateUser = (user, login) => {
    let bearer = login.tokenType+' '+login.accessToken
    let url = constants.API_URL+constants.API_USERS+"/"+user.id
    //hacemos llamada con fecth y recibimos el resultado asincrono en el then
    return fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: bearer,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    }).then(Response => {
            json = Response.json()
            if (constants.PAINT_URL){
                console.log ("update => ",url, JSON.stringify(user), Response)
            }
            //retornamos la llamada , el parseo del contenido a json y los datos del user
            return Promise.all([Response, json, user]);
        });
};

export const delUser = (user, login) => {
    let bearer = login.tokenType+' '+login.accessToken
    let url = constants.API_URL+constants.API_USERS+"/"+user.id
    //hacemos llamada con fecth y recibimos el resultado asincrono en el then
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: bearer,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    }).then(Response => {
            json = Response.json()
            if (constants.PAINT_URL){
                console.log ("update => ",url, JSON.stringify(user), Response)
            }
            //retornamos la llamada , el parseo del contenido a json y los datos del user
            return Promise.all([Response, json, user]);
        });
};
