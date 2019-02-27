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
            const { page, pageSize, ...rest } = params;

            const mapIds = { ...state.mapIds };
            mapIds[JSON.stringify(rest)] = { ids: action.result, page, pageSize };

            return {
                ...state,
                ids: state.ids.concat(action.result),
                loading: false,
                loaded: true,
                mapIds: mapIds
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