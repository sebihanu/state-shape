
import * as types from 'actions/commentTypes';
import initialState from 'utils/initialState';
import { union } from 'lodash';

const reducer = (state = initialState.postComments, action) => {
    switch (action.type) {
        case types.LOAD_POSTCOMMENTS_STARTED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], loading: true };
            return result;
        }

        case types.LOAD_POSTCOMMENTS_SUCCEEDED: {
            const { key, page, pageSize } = action;

            const currentIds = state[key] ? state[key].ids : [];
            let result = { ...state };
            result[key] = { ...state[key], ids: union(currentIds, action.result), page, pageSize, loading: false };            

            return result;
        }

        case types.LOAD_POSTCOMMENTS_FAILED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], loading: false };
            return result;
        }

        case types.REPLY_POST_SUCCEEDED: {
            //const { key } = action;
            return {};
        }

        default:
            return state
    }
}

export default reducer