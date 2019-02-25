import * as types from 'actions/postTypes';
import initialState from 'utils/initialState';

const reducer = (state = initialState.myLatestPosts, action) => {
    switch (action.type) {
        case types.LOAD_POSTS_STARTED: {            
            return {
                ...state,
                loading: true
            }
        }

        case types.LOAD_POSTS_SUCCEEDED: {
            let ids = action.payload.map(p => p.id);

            return {
                ...state,                
                ids: ids,
                loading: false,
                loaded: true
            };
        }

        case types.LOAD_POSTS_FAILED: {
            return {
                ...state,
                loading: false
            }
        }

        default:
            return state
    }
}

export default reducer