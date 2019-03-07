
import * as types from 'actions/postTypes';
import initialState from 'utils/initialState';

const reducer = (state = initialState.editPosts, action) => {
    switch (action.type) {
        case types.LOAD_POST_STARTED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], loading: true };
            return result;
        }

        case types.LOAD_POST_SUCCEEDED: {
            const { key } = action;
            
            let result = { ...state };
            result[key] = { ...state[key], loading: false, loaded: true };            

            return result;
        }

        case types.LOAD_POST_FAILED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], loading: false };
            return result;
        }

        case types.UPDATE_POST_STARTED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], saving: true, saved: false };
            return result;
        }

        case types.UPDATE_POST_SUCCEEDED: {
            const { key } = action;
            
            let result = { ...state };
            result[key] = { ...state[key], saving: false, saved: true, loaded: false };

            return result;
        }

        case types.UPDATE_POST_FAILED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], saving: false, saved: false };
            return result;
        }

        default:
            return state
    }
}

export default reducer