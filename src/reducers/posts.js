import * as types from 'actions/postTypes';
import initialState from 'utils/initialState';

const reducer1 = (state = initialState.posts, action) => {
  switch (action.type) {
    case types.LOAD_POSTS_STARTED: {
      return {
        ...state,
        postsLoading: true
      }
    }

    case types.LOAD_POSTS_SUCCEEDED: {
      return {
        ...state,
        data: action.payload,
        postsLoading: false,
        postsLoaded: true
      };
    }

    case types.LOAD_POSTS_FAILED: {
      return {
        ...state,
        postsLoading: false
      }
    }

    default:
      return state
  }
}

export default reducer1