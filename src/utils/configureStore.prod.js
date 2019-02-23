import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reducers from '../reducers';
import initialState from './initialState';

function configureStore(initialState) {
    return createStore(reducers, initialState,
        compose(
            applyMiddleware(
                thunk,
                logger)
        ));

}

const store = configureStore(initialState);

export default store;
