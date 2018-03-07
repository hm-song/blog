import { createAction, handleActions } from 'redux-actions';

import axios from 'axios';
import Quill from 'quill';
import qs from 'qs';

const INIT_EDITOR = 'editor/INIT_EDITOR';
const RECEIVE_POST_DETAIL = 'editor/RECEIVE_POST_DETAIL';
const HANDLE_PUBLIC_CHANGE = 'editor/HANDLE_PUBLIC_CHANGE';

const initialState = {
    quillTitle: '',
    quillBody: '',
    postId: '',
    title: '',
    display: true,
    body: ''
}

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
    // [RECEIVE_POST_AND_MODIFIABLE]: (state, action) => {
    //     return {
    //         ...state,
    //         title: action.payload.title,
    //         body: action.payload.body
    //     }
    // }
}, initialState);

export const initEditor = createAction(INIT_EDITOR);
export const receivePostDetail = createAction(RECEIVE_POST_DETAIL);
export const handlePublicChange = createAction(HANDLE_PUBLIC_CHANGE);

export const fetchPostAndModifiable = (postId) => {
    return (dispatch) => {
        return axios.get('/api/public/posts/' + postId)
            .then(response => {
                console.log(response.data);
                const editorBody = new Quill('.editor-content', {
                    placeholder: 'Write post content here',
                    theme: 'snow'
                });

                const editorTitle = new Quill('.editor-title', {
                    placeholder: 'Write post title here',
                    theme: 'bubble'
                });

                editorTitle.setText(response.data.title);
                editorBody.setText(response.data.contents);

                dispatch(initEditor({editorTitle, editorBody}));
                dispatch(receivePostDetail(response.data));
            });
    }
}

export const submit = () => {
    return (dispatch, getState) => {
        if (confirm('저장하시겠습니까?')) {
            console.log(getState().editor);
            const postId = getState().editor.postId;
            const title = getState().editor.quillTitle.getText();
            const body = getState().editor.quillBody.getText();
            const display = getState().editor.display;

            const params = {
                title: title,
                contents: body,
                display: display
            }

            axios.post('/api/admin/posts/' + postId + '/modify', qs.stringify(params))
                .then(response => {
                    alert('저장됐습니다.');
                    window.location.href = '/posts/' + response.data;
                })
        }
    }
}