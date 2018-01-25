import * as types from '../actions/ActionTypes';


const initialState = {
    page: 0,
    posts: [{id: 1, title: "FJEPOJFPOQJPFOEJPFoj", regDate: "2017-12-05", modDate: null, display: true}],

    postDetail: {
        id: 0,
        title: '',
        contents: ''
    },

    isFetching: false,
    authenticated: false
}

const blogApp = (state = initialState, action) => {
    switch (action.type) {
        case types.RECEIVE_POSTS: {
            console.log(action.posts);
            return {
                ...state,
                isFetching: action.isFetching,
                posts: action.posts
            }
        }

        case types.RECEIVE_POST_DETAIL: {
            return {
                ...state,
                isFetching: action.isFetching,
                postDetail: action.postDetail
            }
        }

        default:
            return state;
    }
};

export default blogApp;
