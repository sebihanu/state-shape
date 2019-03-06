
import * as types from 'actions/commentTypes';
import initialState from 'utils/initialState';
import { union } from 'lodash';

const reducer = (state = initialState.blogComments, action) => {
    switch (action.type) {
        case types.LOAD_BLOGCOMMENTS_STARTED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], loading: true };
            return result;
        }

        case types.LOAD_BLOGCOMMENTS_SUCCEEDED: {
            const { key, page, pageSize } = action;

            const currentIds = state[key] ? state[key].ids : [];
            let result = { ...state };
            result[key] = { ...state[key], ids: union(currentIds, action.result), page, pageSize, loading: false };            

            return result;
        }

        case types.LOAD_BLOGCOMMENTS_FAILED: {
            const { key } = action;
            let result = { ...state };
            result[key] = { ...state[key], loading: false };
            return result;
        }

        default:
            return state
    }
}

export default reducer