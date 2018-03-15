import axios from 'axios';

import * as message from '../helper/message';

import { fetchPosts } from '../module/posts';

export const HANDLE_CHANGE = 'HANDLE_CHANGE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function handleChange(e) {
    return {
        type: HANDLE_CHANGE,
        name: e.target.name,
        value: e.target.value
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

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
                    dispatch(fetchPosts());
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