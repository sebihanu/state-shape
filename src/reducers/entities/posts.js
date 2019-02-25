import * as types from 'actions/postTypes';
import initialState from 'utils/initialState';
import merge from 'lodash/merge'

const reducer = (state = initialState.entities.posts, action) => {
    switch (action.type) {
        case types.LOAD_POSTS_SUCCEEDED: {
            return merge([], state, action.payload);
        }

        default:
            return state
    }
}

export default reducer