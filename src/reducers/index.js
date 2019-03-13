import { combineReducers } from 'redux'
import { merge } from 'lodash'
import viewPosts from './posts/viewPosts'
import editPosts from './posts/editPosts'
import comments from './comments/comments'
import currentUser from './currentUser'
import initialState from 'utils/initialState';

const entities = (state = initialState.entities, action) => {
  if (action.entities) {
    return merge({}, state, action.entities);
  }

  return state;
}

const posts = combineReducers({
  viewPosts,
  editPosts
});

export default combineReducers({
  entities,
  comments,
  posts,
  currentUser
})