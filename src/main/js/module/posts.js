import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';
import Parser from 'html-react-parser';

import { highlight } from '../helper/highlighter';
import handleError from '../helper/errorHandler';

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const RECEIVE_POST_DETAIL = 'posts/RECEIVE_POST_DETAIL';
export const UPDATE_PAGE = 'posts/UPDATE_PAGE';
export const SEND_REQUEST = 'posts/SEND_REQUEST';

const initialState = {
    page: 0,
    search: '',

    hasNextPage: false,
    hasPrevPage: false,

    posts: [],

    postDetail: {
        id: 0,
        title: '',
        contents: '',
        tags: []
    },
    isFetching: false
};

export default handleActions({
    [RECEIVE_POSTS]: (state, action) => {
        return {
            ...state,
            posts: action.payload,
            isFetching: false
        }
    },
    [RECEIVE_POST_DETAIL]: (state, action) => {
        return {
            ...state,
            postDetail: action.payload,
            isFetching: false
        }
    },
    [UPDATE_PAGE]: (state, action) => {
        return {
            ...state,
            page: action.payload.page,
            search: action.payload.search,
            hasNextPage: !action.payload.last,
            hasPrevPage: !action.payload.first
        }
    },
    [SEND_REQUEST]: (state) => {
        return {
            ...state,
            isFetching: true,
        }
    }
}, initialState);

export const fetchPosts = (page = 0, search) => {
    return (dispatch) => {
        let param = '?page=' + page;
        param = search ? param.concat('&search=' + search) : param;

        dispatch(sendRequest());
        return axios.get('/api/public/posts' + param)
            .then(response => {
                dispatch(
                    updatePage({
                        page,
                        search,
                        first: response.data.first,
                        last: response.data.last
                    }));
                dispatch(receivePosts(response.data.content));
            }).catch(error => {
                handleError(error);
            });
    }
};

// TODO: 포스트 보기 전환시 화면 이동 직후 이전 포스트 내용 노출 이슈 수정
export const fetchPostDetail = (watchingPostId) => {
    return dispatch => {
        dispatch(sendRequest());

        return axios.get('/api/public/posts/' + watchingPostId)
            .then(response => {
                const post = {
                    ...response.data,
                    contents: Parser(response.data.contents)
                };
                dispatch(receivePostDetail(post));
                highlight();
            }).catch(error => {
                handleError(error);
            });
    }
};

export const receivePosts = createAction(RECEIVE_POSTS);
export const receivePostDetail = createAction(RECEIVE_POST_DETAIL);
export const updatePage = createAction(UPDATE_PAGE);
export const sendRequest = createAction(SEND_REQUEST);