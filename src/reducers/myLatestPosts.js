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
            const { params } = action;                            
            
            return {
                ...state,
                ids: action.result,
                loading: false,
                loaded: true,
                mapIds: new Map([...state.mapIds, [JSON.stringify(params), action.result]])
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