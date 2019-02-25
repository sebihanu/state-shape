import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import reduxImmutableState from 'redux-immutable-state-invariant';
import reducers from '../reducers';
import initialState from './initialState';
import reduxApiMiddleware from './reduxApiMiddleware'

function configureStore(initialState) {
    const composeEnhancers = typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            trace: true
        }) : compose;

    return createStore(reducers, initialState,
        composeEnhancers(
            applyMiddleware(
                thunk,
                reduxApiMiddleware,
                reduxImmutableState(),
                logger)
        ));

}

const store = configureStore(initialState);

export default store;
