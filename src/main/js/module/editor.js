import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';
import qs from 'qs';

import * as tagActions from './tags';

const INIT_EDITOR = 'editor/INIT_EDITOR';
const RECEIVE_POST_DETAIL = 'editor/RECEIVE_POST_DETAIL';
const HANDLE_PUBLIC_CHANGE = 'editor/HANDLE_PUBLIC_CHANGE';

const initialState = {
    quillTitle: '',
    quillBody: '',
    postId: '',
    title: '',
    body: '',
    display: true
};

export default handleActions({
    [INIT_EDITOR]: (state, action) => {
        return {
            ...state,
            quillTitle: action.payload.editorTitle,
            quillBody: action.payload.editorBody
        }
    },
    [RECEIVE_POST_DETAIL]: (state, action) => {
        return {
            ...state,
            postId: action.payload.id,
            display: action.payload.display
        }
    },
    [HANDLE_PUBLIC_CHANGE]: (state) => {
        return {
            ...state,
            display: !state.display
        }
    }
}, initialState);

export const initEditor = createAction(INIT_EDITOR);
export const receivePostDetail = createAction(RECEIVE_POST_DETAIL);
export const handlePublicChange = createAction(HANDLE_PUBLIC_CHANGE);

export const fetchPostAndModifiable = (postId) => {
    return (dispatch, getState) => {
        return axios.get('/api/public/posts/' + postId)
            .then(response => {
                getState().editor.quillTitle.setText(response.data.title);
                getState().editor.quillBody.setText(response.data.contents);
                dispatch(receivePostDetail(response.data));

                if (response.data.tags) {
                    dispatch(tagActions.restTag());
                    response.data.tags.map((item) => {
                        dispatch(tagActions.handleAdd(item.tag));
                    });
                }
            });
    }
}

export const submit = (postId, params) => {
    return () => {
        axios.post('/api/admin/posts/' + postId + '/modify', qs.stringify(params, { arrayFormat: 'repeat'}))
            .then(response => {
                alert('저장됐습니다.');
                // window.location.href = '/posts/' + response.data;
            });
    }
}