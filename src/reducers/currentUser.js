
import * as types from 'actions/blogTypes';
import initialState from 'utils/initialState';

const reducer = (state = initialState.currentUser, action) => {
    switch (action.type) {
        case types.LOAD_MYBLOG_STARTED: {
            return { ...state, blogLoading: true };
        }

        case types.LOAD_MYBLOG_SUCCEEDED: {
            return {
                ...state,
                blogLoading: false,
                blogLoaded: true,
                blogId: action.result
            };
        }

        case types.LOAD_MYBLOG_FAILED: {
            return {
                ...state,
                blogLoading: false
            };
        }

        default:
            return state
    }
}

export default reducer