
import * as types from 'actions/commentTypes';
import initialState from 'utils/initialState';

const reducer = (state = initialState.comments.postComments, action) => {
    switch (action.type) {
        case types.LOAD_POSTCOMMENTS_STARTED: {
            const { key, page } = action;
            let result = { ...state };
            result[key] = { ...state[key] };
            result[key][page] = { ...result[key][page], loading: true };

            return result;
        }

        case types.LOAD_POSTCOMMENTS_SUCCEEDED: {
            const { key, page } = action;

            let result = { ...state };
            result[key] = { ...state[key] };
            result[key][page] = { ...result[key][page], ids: [...action.result], loading: false };

            return result;
        }

        case types.LOAD_POSTCOMMENTS_FAILED: {
            const { key, page } = action;
            let result = { ...state };
            result[key][page] = { ...result[key][page], loading: false };
            return result;
        }

        default:
            return state
    }
}

export default reducer