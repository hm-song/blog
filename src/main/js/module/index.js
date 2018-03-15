import { combineReducers } from 'redux';

import posts from './posts';
import login from './login';
import editor from './editor';
import tags from './tags';

export default combineReducers({
    posts,
    login,
    editor,
    tags
});