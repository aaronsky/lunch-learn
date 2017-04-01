import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { PageHome } from './pages';
import * as reducers from 'lunchlearn/js/reducers';
import * as Navigation from 'lunchlearn/js/utilities/navigation';
import connectComponent from 'lunchlearn/js/utilities/connectComponent';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const content = React.createElement(connectComponent(Navigation), {});

export default class LunchLearnApp extends Component {
    render() {
        return (
            <Provider store={store}>
                {content}
            </Provider>
        );
    }
}