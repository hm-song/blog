import React from 'react';
import ReactDOM from 'react-dom';
import { Provider,  } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './module';
import App from './App';

let store = createStore(
    reducers,
    applyMiddleware(thunkMiddleware)
);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);

