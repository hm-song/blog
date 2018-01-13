import axios from 'axios';

import * as types from './ActionTypes'

export const getPost = (postId) => {
    return {
        type: types.GET_POST,
        watchingPostId: postId
    }
}

export const requestPosts = (page) => {
    return {
        type: types.REQUEST_POSTS,
        isFetching: true,
        page: page
    }
}

export const receivePosts = (posts) => {
    return {
        type: types.RECEIVE_POSTS,
        isFetching: false,
        posts: posts
    }
}

export const fetchPosts = (page) => {
    return dispatch => {
        dispatch(requestPosts());
        return axios.get('/api/posts?page=' + page)
            .then(response => {
                console.log(response);
                dispatch(receivePosts(response.data.content))
            });
    }
}