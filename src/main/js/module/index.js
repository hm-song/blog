import { combineReducers } from 'redux';

import posts from './posts';
import login from './login';
import editor from './editor';

export default combineReducers({
    posts,
    login,
    editor
});