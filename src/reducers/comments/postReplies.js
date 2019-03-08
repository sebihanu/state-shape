
import * as types from 'actions/commentTypes';
import initialState from 'utils/initialState';

const reducer = (state = initialState.comments.postReplies, action) => {
    switch (action.type) {        
        case types.REPLY_POST_STARTED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], saving: true, saved: false };
            return result;
        }

        case types.REPLY_POST_SUCCEEDED: {
            const { key } = action;
            
            let result = { ...state };
            result[key] = { ...state[key], saving: false, saved: true };

            return result;
        }

        case types.REPLY_POST_FAILED: {
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