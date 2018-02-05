import * as types from '../actions/LoginActionCreators';

let initialState = {
    username: '',
    password: '',
    authenticated: false
};

const login = (state = initialState, action) => {
    switch (action.type) {
        case types.HANDLE_CHANGE: {
            const nextState = {};
            nextState[action.name] = action.value;
            return {
                ...state,
                ...nextState
            }
        }

        case types.LOGIN_SUCCESS: {
            return {
                ...state,
                authenticated: true
            }
        }

        default:
            return state;
    }
}

export default login;