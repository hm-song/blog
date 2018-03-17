import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initialState = fromJS({
    tags: [],
    suggestions: []
})

export const HANDLE_ADD = 'tag/HANDLE_ADD';
export const HANDLE_DELETE = 'tags/HANDLE_DELETE';
export const HANDLE_DRAG = 'tag/HANDLE_DRAG';
export const RESET_TAG = 'tag/RESET_TAG';

export default handleActions({
    [HANDLE_ADD]: (state, action) => {
        return state.update('tags', tags =>
            tags.insert(
                tags.size + 1,
                {
                    id: tags.size + 1,
                    text: action.payload
                }));
    },
    [HANDLE_DELETE]: (state, action) => {
        return state.update('tags', tags => tags.delete(action.payload));
    },
    [HANDLE_DRAG]: (state, action) => {
        const param = action.payload;
        const result = state.update('tags', tag =>
            tag.splice(param.currPos, 1)
                .splice(param.newPos, 0, param.tag));
        return result;
    },
    [RESET_TAG]: (state) => {
        return state.update('tags', tags => tags.clear());
    }
}, initialState);

export const restTag = createAction(RESET_TAG);
export const handleAdd = createAction(HANDLE_ADD);
export const handleDelete = createAction(HANDLE_DELETE);
export const handleDrag = createAction(HANDLE_DRAG);