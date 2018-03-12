import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';
import Parser from 'html-react-parser';

import { highlight } from '../helper/highlighter';

export const RECEIVE_POSTS = 'posts/RECEIVE_POSTS';
export const RECEIVE_POST_DETAIL = 'posts/RECEIVE_POST_DETAIL';
export const UPDATE_PAGE = 'posts/UPDATE_PAGE';
export const HANDLE_SEARCH_CHANGE = '/posts/HANDLE_SEARCH_CHANGE';

const initialState = {
    page: 0,
    hasNextPage: false,
    hasPrevPage: false,

    posts: [{id: 1, title: "FJEPOJFPOQJPFOEJPFoj", regDate: "2017-12-05", modDate: null, display: true}],

    searchKeyword: '',

    postDetail: {
        id: 0,
        title: '',
        contents: ''
    }
};

export default handleActions({
    [RECEIVE_POSTS]: (state, action) => {
        return {
            ...state,
            posts: action.payload
        }
    },
    [RECEIVE_POST_DETAIL]: (state, action) => {
        return {
            ...state,
            postDetail: action.payload
        }
    },
    [UPDATE_PAGE]: (state, action) => {
        return {
            ...state,
            page: action.payload.page,
            hasNextPage: !action.payload.last,
            hasPrevPage: !action.payload.first
        }
    },
    [HANDLE_SEARCH_CHANGE]: (state, action) => {
        return {
            ...state,
            searchKeyword: action.payload.target.value
        }
    }
}, initialState);

export const fetchPosts = (page = 0, keyword) => {
    return (dispatch) => {
        let param = '?page=' + page;
        param = keyword ? param.concat('&keyword=' + keyword) : param;

        return axios.get('/api/public/posts' + param)
            .then(response => {
                dispatch(
                    updatePage({
                        page,
                        first: response.data.first,
                        last: response.data.last
                    }));
                dispatch(receivePosts(response.data.content));
            });
    }
};

// TODO: 포스트 보기 전환시 화면 이동 직후 이전 포스트 내용 노출 이슈 수정
export const fetchPostDetail = (watchingPostId) => {
    return dispatch => {
        return axios.get('/api/public/posts/' + watchingPostId)
            .then(response => {
                const post = {
                    ...response.data,
                    contents: Parser(response.data.contents)
                };
                dispatch(receivePostDetail(post));
                highlight();
            })
    }
};

export const receivePosts = createAction(RECEIVE_POSTS);
export const receivePostDetail = createAction(RECEIVE_POST_DETAIL);
export const updatePage = createAction(UPDATE_PAGE);
export const handleSearchChange = createAction(HANDLE_SEARCH_CHANGE);