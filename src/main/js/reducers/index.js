import * as types from '../actions/ActionTypes';

const initialState = {
    page: 0,
    watchingPostId: -1,
    posts: [{id: 1, title: "FJEPOJFPOQJPFOEJPFoj", regDate: "2017-12-05", modDate: null, display: true}],
    isFetching: false
}

const blogApp = (state = initialState, action) => {
    switch (action.type) {
        case types.REQUEST_POSTS:
            return {
                ...state,
                isFetching: action.isFetching,
                page: action.page
            }

        case types.RECEIVE_POSTS:{
            console.log(action.posts);
            return {
                ...state,
                isFetching: action.isFetching,
                posts: action.posts
            }
        }

        case types.GET_POST: {
            console.log('get post is not implemented yet');
            return {
                ...state,
                watchingPostId: action.watchingPostId
            }
        }

        default:
            return state;
    }
};

export default blogApp;
