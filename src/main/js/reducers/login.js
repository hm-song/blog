import * as types from '../actions/LoginActionCreators';

let initialState = {
    username: '',
    password: '',
    authenticated: false
};

const login = (state = initialState, action) => {
    const nextState = {};
    nextState[action.name] = action.value;
    switch (action.type) {
        case types.HANDLE_CHANGE: {
            return {
                ...state,
                ...nextState
            }
        }

        default:
            return state;
    }
}

export default login;