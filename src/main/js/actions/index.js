import axios from 'axios';
import Parser from 'html-react-parser';

import * as types from './ActionTypes'

export const receivePosts = (posts) => {
    return {
        type: types.RECEIVE_POSTS,
        isFetching: false,
        posts: posts
    }
}

export const fetchPosts = () => {
    return (dispatch, getState) => {
        const page = getState().posts.page;
        return axios.get('/api/public/posts?page=' + page)
            .then(response => {
                dispatch(receivePosts(response.data.content));
            });
    }
}

export const requestPostDetail = () => {
    return {
        type: types.REQUEST_POST_DETAIL,
        isFetching: true
    }
}

export const receivePostDetail = (postDetail) => {
    return {
        type: types.RECEIVE_POST_DETAIL,
        isFetching: false,
        postDetail: postDetail
    }
}

export const fetchPostDetail = (watchingPostId) => {
    return dispatch => {
        return axios.get('/api/public/posts/' + watchingPostId)
            .then(response => {
                const post = {
                    ...response.data,
                    contents: Parser(response.data.contents)
                };
                dispatch(receivePostDetail(post));
            })
    }
}
