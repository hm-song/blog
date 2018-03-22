import { createAction, handleActions } from 'redux-actions';

import * as message from '../helper/message';
import axios from 'axios';
import * as postActions from './posts';

export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SET_NOT_AUTHENTICATED = 'SET_NOT_AUTHENTICATED';

let initialState = {
    username: '',
    password: '',
    authenticated: false
};

export default handleActions({
    [HANDLE_CHANGE]: (state, action) => {
        const nextState = {};
        nextState[action.payload.target.name] = action.payload.target.value;
        return {
            ...state,
            ...nextState
        }
    },
    [LOGIN_SUCCESS]: (state) => {
        return {
            ...state,
            authenticated: true
        }
    },
    [SET_NOT_AUTHENTICATED]: (state) => {
        return {
            ...state,
            authenticated: false
        }
    }
}, initialState);

export function login() {
    return (dispatch, getState) => {
        const param = {
            username: getState().login.username,
            password: getState().login.password
        };

        const config = {
            headers: {
                'Content-Type': 'application/application/x-www-form-urlencoded'
            }
        };

        return axios.post('/handleLogin?username=' + param.username + '&password=' + param.password, null, config)
            .then(response => {
                if (response.status == 200) {
                    $('#loginModal').modal('hide');
                    dispatch(loginSuccess());
                    dispatch(postActions.fetchPosts());
                } else {
                    alert(message.UNEXPECTED_ERROR);
                }
            }).catch(error => {
                if (error.response.status == 401 && error.response.data.message) {
                    alert(error.response.data.message);
                } else {
                    alert(message.UNEXPECTED_ERROR);
                }
            });
    }
}

export function checkAuthenticated() {
    return (dispatch) => {
        return axios.get('/api/public/checkAuthentication')
            .then(response => {
                if (response.data) dispatch(loginSuccess());
                else dispatch(setUnAuthenticated());
            });
    }
}

export const handleChange = createAction(HANDLE_CHANGE);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const setUnAuthenticated = createAction(SET_NOT_AUTHENTICATED);