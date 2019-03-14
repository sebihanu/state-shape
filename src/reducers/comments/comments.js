import { combineReducers } from 'redux'
import * as types from 'actions/commentTypes';
import initialState from 'utils/initialState';
import blogComments from './blogComments'
import postComments from './postComments'
import postReplies from './postReplies'

const combinedReducer = combineReducers({
    blogComments,
    postComments,
    postReplies,
    invalid: (state = initialState.comments.invalid) => state
});

const reducer = (state = initialState.comments, action) => {
    switch (action.type) {
        case types.REPLY_POST_SUCCEEDED: {
            const postId = action.key;
            const postComments = Object.keys(state.postComments).reduce((obj, key) => {
                if (!key.includes(`"postId":${postId}`)) {
                    obj[key] = state.postComments[key]
                }

                return obj;
            }, {});

            return {
                ...state,
                blogComments: {},
                postComments: postComments,
                invalid: true
            };
        }

        default:
            return state.invalid ? { ...state, invalid: false } : state;


    }
}

export default (state, action) => reducer(combinedReducer(state, action), action);