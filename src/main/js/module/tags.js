import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

const initialState = Map({
    tags: List([Map({ id: 1, text: "Thailand" }), Map({ id: 2, text: "India" })]),
    suggestions: List([])
});

export const HANDLE_ADD = 'tag/HANDLE_ADD';
export const HANDLE_DELETE = 'tags/HANDLE_DELETE';
export const HANDLE_DRAG = 'tag/HANDLE_DRAG';

export default handleActions({
    [HANDLE_ADD]: (state, action) => {
        console.log(action);
        return state.set('tags',
            state.suggestions.insert(
                state.suggestions.size + 1,
                {
                    id: state.suggestions.size + 1,
                    text: action.payload
                }));
    }
}, initialState);

export const handleAdd = createAction(HANDLE_ADD);
export const handleDelete = createAction(HANDLE_DELETE);
export const handleDrag = createAction(HANDLE_DRAG);