import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reducers from '../reducers';
import initialState from './initialState';
import reduxApiMiddleware from './reduxApiMiddleware'

function configureStore(initialState) {
    return createStore(reducers, initialState,
        compose(
            applyMiddleware(
                thunk,
                reduxApiMiddleware,
                logger)
        ));

}

const store = configureStore(initialState);

export default store;
