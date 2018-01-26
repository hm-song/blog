import axios from 'axios';
import qs from 'qs';

export const HANDLE_CHANGE = 'HANDLE_CHANGE';

export function handleChange(e) {
    return {
        type: HANDLE_CHANGE,
        name: e.target.name,
        value: e.target.value
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
        }

        console.log(qs.stringify(param));

        return axios.post('/handleLogin?username=' + param.username + '&password=' + param.password, null, config)
            .then(response => {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            })
    }
}