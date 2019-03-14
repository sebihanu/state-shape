
import * as types from 'actions/postTypes';
import initialState from 'utils/initialState';

const reducer = (state = initialState.postsFilters, action) => {
    switch (action.type) {
        case types.LOAD_POSTS_FILTERS_STARTED: {
            return { ...state, loading: true };
        }

        case types.LOAD_POSTS_FILTERS_SUCCEEDED: {
            return {
                ...state,
                loading: false, loaded: true,
                filters: action.payload
            };
        }

        case types.LOAD_POSTS_FILTERS_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        default:
            return state
    }
}

export default reducer