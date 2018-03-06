import { createAction, handleActions } from 'redux-actions';

const RECEIVE_POST_DETAIL = 'writer/RECEIVE_POST_DETAIL';
const INIT_EDITOR = 'writer/INIT_EDITOR';

const initialState = {
    quillTitle: '',
    quillBody: '',
    title: '',
    body: ''
}

export default handleActions({
    [INIT_EDITOR]: (state, action) => {
        return {
            ...state,
            quillTitle: action.payload.quillTitle,
            quillBody: action.payload.quillBody
        }
    }
}, initialState);

export const initEditor = createAction(INIT_EDITOR);

